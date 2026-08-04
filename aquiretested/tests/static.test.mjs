import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pageNames = (await fs.readdir(root)).filter((name) => name.endsWith('.html'));

for (const pageName of pageNames) {
  test(`${pageName} has complete metadata and accessible static markup`, async () => {
    const html = await fs.readFile(path.join(root, pageName), 'utf8');
    assert.equal((html.match(/<h1\b/gi) || []).length, 1, 'exactly one h1 is required');
    for (const marker of [
      '<title>', 'name="description"', 'rel="canonical"', 'rel="manifest"',
      'property="og:title"', 'property="og:description"', 'property="og:url"', 'property="og:image"',
      'name="twitter:card"', 'name="twitter:title"', 'name="twitter:description"',
      'aria-label="Legal"',
    ]) assert.ok(html.includes(marker), `missing ${marker}`);

    assert.doesNotMatch(html, /\sonclick=/i);
    assert.doesNotMatch(html, /\+91022|\+91 022/);
    const ids = [...html.matchAll(/\bid="([^"]+)"/gi)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length, 'duplicate IDs are not allowed');

    for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
      assert.match(match[0], /\balt="[^"]*"/i, `image missing alt: ${match[0]}`);
      assert.match(match[0], /\bwidth="\d+"/i, `image missing width: ${match[0]}`);
      assert.match(match[0], /\bheight="\d+"/i, `image missing height: ${match[0]}`);
    }
    for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)) {
      assert.match(match[0], /\brel="[^"]*(?:noopener|noreferrer)[^"]*"/i, 'new-tab link missing safe rel');
    }
  });
}

test('all local HTML, script, stylesheet and image references resolve', async () => {
  for (const pageName of pageNames) {
    const html = await fs.readFile(path.join(root, pageName), 'utf8');
    for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/gi)) {
      let reference = match[1].replace(/&amp;/g, '&').split(/[?#]/)[0];
      if (!reference || /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(reference)) continue;
      if (reference === '/') reference = 'index.html';
      reference = reference.replace(/^\//, '');
      let candidate = path.resolve(root, reference);
      if (!path.extname(candidate)) candidate += '.html';
      assert.ok(candidate.startsWith(root), `reference escapes root in ${pageName}`);
      try {
        await fs.access(candidate);
      } catch {
        const publicCandidate = path.resolve(root, 'public', reference);
        await assert.doesNotReject(fs.access(publicCandidate), `missing ${reference} from ${pageName}`);
      }
    }
  }
});
