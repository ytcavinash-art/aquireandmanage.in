const ALLOWED_ORIGINS = new Set([
  'https://www.aquireandmanage.com',
  'https://aquireandmanage.com',
  'http://localhost:5173',
  'http://localhost:5050',
]);

if (process.env.PUBLIC_SITE_ORIGIN) {
  ALLOWED_ORIGINS.add(process.env.PUBLIC_SITE_ORIGIN.replace(/\/$/, ''));
}

const requestBuckets = new Map();

export function allowSameSiteRequest(request, response) {
  const origin = request.headers.origin;
  if (!origin || ALLOWED_ORIGINS.has(origin)) return true;
  response.status(403).json({ error: 'Request origin is not allowed.' });
  return false;
}

export function rateLimit(request, response, { limit = 10, windowMs = 60_000 } = {}) {
  const forwarded = String(request.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const key = forwarded || request.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  const recent = (requestBuckets.get(key) || []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) {
    response.status(429).json({ error: 'Too many requests. Please try again shortly.' });
    return false;
  }
  recent.push(now);
  requestBuckets.set(key, recent);
  return true;
}

export function cleanText(value, maxLength) {
  return typeof value === 'string'
    ? value.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLength)
    : '';
}

export function cleanMultilineText(value, maxLength) {
  return typeof value === 'string'
    ? value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim().slice(0, maxLength)
    : '';
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value) && value.length <= 254;
}

export function isIndianMobile(value) {
  return /^[6-9]\d{9}$/.test(value);
}

export function isCronAuthorized(request) {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret) && request.headers.authorization === `Bearer ${secret}`;
}
