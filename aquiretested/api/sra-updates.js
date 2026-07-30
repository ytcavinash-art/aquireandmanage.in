const SRA_HOME_URL = 'https://www.sra.gov.in/en';
const REQUEST_TIMEOUT_MS = 15_000;

function getFlightPayload(html) {
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

function extractArray(payload, key) {
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
    const sraResponse = await fetch(SRA_HOME_URL, {
      signal: controller.signal,
      headers: {
        Accept: 'text/html,application/xhtml+xml',
        'User-Agent': 'Mozilla/5.0 (compatible; A&M-Advisory-SRA-Updates/1.0)',
      },
    });
    if (!sraResponse.ok) throw new Error(`SRA responded with status ${sraResponse.status}.`);

    const payload = getFlightPayload(await sraResponse.text());
    response.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');
    return response.status(200).json({
      source: SRA_HOME_URL,
      fetchedAt: new Date().toISOString(),
      orders: extractArray(payload, 'latestOrdersData').map(normalize),
      circulars: extractArray(payload, 'latestCircularData').map(normalize),
      news: extractArray(payload, 'newsUpdateData').map(normalize),
    });
  } catch (error) {
    return response.status(502).json({
      error: error instanceof Error ? error.message : 'Unable to load SRA updates.',
    });
  } finally {
    clearTimeout(timeout);
  }
}
