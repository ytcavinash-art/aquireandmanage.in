import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import contactHandler from '../api/contact.js';
import feedbackHandler from '../api/feedback.js';
import chatHandler from '../api/chat.js';
import cronHandler from '../api/cron-daily-brief.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
function mockResponse() {
  return {
    statusCode: 200, body: null, headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

test('private form APIs do not allow public GET requests', async () => {
  for (const handler of [contactHandler, feedbackHandler, chatHandler]) {
    const response = mockResponse();
    await handler({ method: 'GET', headers: {}, socket: {} }, response);
    assert.equal(response.statusCode, 405);
  }
});

test('cron route rejects requests without the configured bearer secret', async () => {
  const response = mockResponse();
  await cronHandler({ method: 'GET', headers: {}, socket: {} }, response);
  assert.equal(response.statusCode, 401);
});

test('frontend contains no placeholder Web3Forms key or PII localStorage database', async () => {
  const source = await fs.readFile(path.join(root, 'js', 'contact.js'), 'utf8');
  assert.doesNotMatch(source, /web3forms|0123456789ab|am_advisory_leads/i);
});

test('site search renders an unmatched query with textContent', async () => {
  const source = await fs.readFile(path.join(root, 'js', 'navigation.js'), 'utf8');
  assert.match(source, /emptyMessage\.textContent/);
  assert.doesNotMatch(source, /innerHTML\s*=\s*`[^`]*No results found[^`]*\$\{query\}/);
});

test('optional cookies require an explicit stored consent choice', async () => {
  const consentSource = await fs.readFile(path.join(root, 'js', 'cookie-consent.js'), 'utf8');
  const navigationSource = await fs.readFile(path.join(root, 'js', 'navigation.js'), 'utf8');
  assert.match(consentSource, /SameSite=Lax/);
  assert.match(consentSource, /data-cookie-action="reject"/);
  assert.match(consentSource, /data-cookie-action="preferences"/);
  assert.match(navigationSource, /AMCookieConsent\?\.has\('functional'\)/);
  assert.match(navigationSource, /functionalConsent && !document\.querySelector\('script\[src\*="translate\.google\.com"\]'/);
});
