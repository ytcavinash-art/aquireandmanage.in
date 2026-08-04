import { Buffer } from 'node:buffer';
import { createDecipheriv } from 'node:crypto';

const SRA_HOME_URL = 'https://www.sra.gov.in/en';
const SRA_API_URL = 'https://apis.sra.gov.in';
const SRA_RESPONSE_KEY = Buffer.from(
  '1f8bce02a9d6e4f5837cbfb814e4c8a3f4e9bcf12d6a4c7b2e6e4f982a5f7d93',
  'hex',
);
const RECORD_LIMIT = 20;
const REQUEST_TIMEOUT_MS = 15_000;

function decryptSraResponse(rawResponse) {
  const encryptedValue = rawResponse.replace(/^"|"$/g, '');
  const [ivHex, encryptedHex] = encryptedValue.split(':');
  if (!ivHex || !encryptedHex) throw new Error('Invalid SRA API response.');

  const decipher = createDecipheriv(
    'aes-256-cbc',
    SRA_RESPONSE_KEY,
    Buffer.from(ivHex, 'hex'),
  );
  const decrypted = decipher.update(encryptedHex, 'hex', 'utf8') + decipher.final('utf8');
  const parsed = JSON.parse(decrypted);
  return typeof parsed === 'string' ? JSON.parse(parsed) : parsed;
}

async function fetchSraDataset(path, signal) {
  const url = new URL(path, SRA_API_URL);
  url.searchParams.set('page', '1');
  url.searchParams.set('limit', String(RECORD_LIMIT));
  url.searchParams.set('language', 'English');

  const response = await fetch(url, {
    signal,
    headers: {
      Accept: 'application/json',
      'User-Agent': 'Mozilla/5.0 (compatible; A&M-Advisory-SRA-Updates/1.0)',
    },
  });
  if (!response.ok) throw new Error(`SRA API responded with status ${response.status}.`);

  const result = decryptSraResponse(await response.text());
  const documents = result?.data?.docs;
  if (!Array.isArray(documents) || documents.length < RECORD_LIMIT) {
    throw new Error(`SRA API returned fewer than ${RECORD_LIMIT} records.`);
  }
  return documents;
}

function _getFlightPayload(html) {
  const chunks = [];
  const pattern = /self\.__next_f\.push\((\[1,"(?:\\.|[^"\\])*"\])\)<\/script>/g;

  for (const match of html.matchAll(pattern)) {
    try {
      chunks.push(JSON.parse(match[1])[1]);
    } catch {
      // Ignore unrelated React flight chunks.
    }
  }

  if (!chunks.length) throw new Error('SRA data payload was not found.');
  return chunks.join('');
}

function _extractArray(payload, key) {
  const marker = `"${key}":`;
  const markerIndex = payload.indexOf(marker);
  const startIndex = payload.indexOf('[', markerIndex + marker.length);
  if (markerIndex < 0 || startIndex < 0) throw new Error(`${key} was not found.`);

  let depth = 0;
  let insideString = false;
  let escaped = false;

  for (let index = startIndex; index < payload.length; index += 1) {
    const character = payload[index];
    if (insideString) {
      if (escaped) escaped = false;
      else if (character === '\\') escaped = true;
      else if (character === '"') insideString = false;
      continue;
    }
    if (character === '"') insideString = true;
    else if (character === '[') depth += 1;
    else if (character === ']' && --depth === 0) {
      return JSON.parse(payload.slice(startIndex, index + 1));
    }
  }
  throw new Error(`${key} was incomplete.`);
}

function normalize(item) {
  return {
    id: item._id || item.unique_path || item.pdf_url,
    title: item.title || 'SRA publication',
    department: typeof item.department_id === 'object' ? item.department_id?.name || '' : '',
    number: item.unique_number || '',
    publishedAt: item.createdAt || item.updatedAt || '',
    url: item.pdf_url || item.website_url || SRA_HOME_URL,
  };
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const [orders, circulars, news] = await Promise.all([
      fetchSraDataset('/web/latest-orders', controller.signal),
      fetchSraDataset('/web/circulars', controller.signal),
      fetchSraDataset('/web/news-and-publications', controller.signal),
    ]);
    response.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');
    return response.status(200).json({
      source: SRA_HOME_URL,
      fetchedAt: new Date().toISOString(),
      orders: orders.map(normalize),
      circulars: circulars.map(normalize),
      news: news.map(normalize),
    });
  } catch (error) {
    return response.status(502).json({
      error: error instanceof Error ? error.message : 'Unable to load SRA updates.',
    });
  } finally {
    clearTimeout(timeout);
  }
}
