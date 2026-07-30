const SRA_HOME_URL = 'https://www.sra.gov.in/en';
const CACHE_TTL_MS = 15 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 15_000;

let cachedResult = null;
let cachedAt = 0;

function getFlightPayload(html) {
  const chunks = [];
  const chunkPattern = /self\.__next_f\.push\((\[1,"(?:\\.|[^"\\])*"\])\)<\/script>/g;

  for (const match of html.matchAll(chunkPattern)) {
    try {
      chunks.push(JSON.parse(match[1])[1]);
    } catch {
      // Ignore unrelated or malformed React flight chunks.
    }
  }

  if (!chunks.length) {
    throw new Error('SRA data payload was not found.');
  }

  return chunks.join('');
}

function extractArray(payload, key) {
  const marker = `"${key}":`;
  const markerIndex = payload.indexOf(marker);
  const startIndex = payload.indexOf('[', markerIndex + marker.length);

  if (markerIndex < 0 || startIndex < 0) {
    throw new Error(`SRA dataset "${key}" was not found.`);
  }

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
    else if (character === ']') {
      depth -= 1;
      if (depth === 0) {
        return JSON.parse(payload.slice(startIndex, index + 1));
      }
    }
  }

  throw new Error(`SRA dataset "${key}" was incomplete.`);
}

function normalizeItem(item) {
  const department = typeof item.department_id === 'object'
    ? item.department_id?.name
    : '';

  return {
    id: item._id || item.unique_path || item.pdf_url,
    title: item.title || 'SRA publication',
    department: department || '',
    number: item.unique_number || '',
    publishedAt: item.createdAt || item.updatedAt || '',
    url: item.pdf_url || item.website_url || SRA_HOME_URL,
  };
}

async function fetchSraUpdates({ force = false } = {}) {
  const now = Date.now();
  if (!force && cachedResult && now - cachedAt < CACHE_TTL_MS) {
    return { ...cachedResult, cached: true };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(SRA_HOME_URL, {
      signal: controller.signal,
      headers: {
        Accept: 'text/html,application/xhtml+xml',
        'User-Agent': 'Mozilla/5.0 (compatible; A&M-Advisory-SRA-Updates/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`SRA responded with status ${response.status}.`);
    }

    const payload = getFlightPayload(await response.text());
    const result = {
      source: SRA_HOME_URL,
      fetchedAt: new Date().toISOString(),
      orders: extractArray(payload, 'latestOrdersData').map(normalizeItem),
      circulars: extractArray(payload, 'latestCircularData').map(normalizeItem),
      news: extractArray(payload, 'newsUpdateData').map(normalizeItem),
    };

    cachedResult = result;
    cachedAt = now;
    return { ...result, cached: false };
  } catch (error) {
    if (cachedResult) {
      return {
        ...cachedResult,
        cached: true,
        stale: true,
        warning: error.message,
      };
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

module.exports = { fetchSraUpdates };
