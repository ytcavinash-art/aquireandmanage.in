import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const files = (await fs.readdir(root)).filter((name) => name.endsWith('.html'));
const escapeAttribute = (value) => value.replace(/&(?!(?:amp|lt|gt|quot|#\d+);)/g, '&amp;').replace(/"/g, '&quot;');

function readImageSize(buffer) {
  if (buffer.length >= 24 && buffer.toString('ascii', 1, 4) === 'PNG') {
    return [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
  }
  if (buffer.length >= 10 && (buffer.toString('ascii', 0, 3) === 'GIF')) {
    return [buffer.readUInt16LE(6), buffer.readUInt16LE(8)];
  }
  if (buffer.length >= 30 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
    const type = buffer.toString('ascii', 12, 16);
    if (type === 'VP8X') return [1 + buffer.readUIntLE(24, 3), 1 + buffer.readUIntLE(27, 3)];
    if (type === 'VP8L') {
      const b0 = buffer[21], b1 = buffer[22], b2 = buffer[23], b3 = buffer[24];
      return [1 + b0 + ((b1 & 0x3f) << 8), 1 + (b1 >> 6) + (b2 << 2) + ((b3 & 0x0f) << 10)];
    }
    const marker = buffer.indexOf(Buffer.from([0x9d, 0x01, 0x2a]));
    if (marker >= 0) return [buffer.readUInt16LE(marker + 3) & 0x3fff, buffer.readUInt16LE(marker + 5) & 0x3fff];
  }
  if (buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) { offset += 1; continue; }
      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
        return [buffer.readUInt16BE(offset + 7), buffer.readUInt16BE(offset + 5)];
      }
      if (!length) break;
      offset += length + 2;
    }
  }
  return null;
}

async function getLocalImageSize(tag) {
  const source = tag.match(/\bsrc="([^"]+)"/i)?.[1];
  if (!source || /^(?:https?:|data:)/i.test(source)) return null;
  const decoded = source.replace(/&amp;/g, '&').split(/[?#]/)[0];
  const imagePath = path.resolve(root, decoded);
  if (!imagePath.startsWith(root)) return null;
  try { return readImageSize(await fs.readFile(imagePath)); } catch { return null; }
}

for (const file of files) {
  const filePath = path.join(root, file);
  let html = await fs.readFile(filePath, 'utf8');
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1].replace(/<[^>]+>/g, '').trim() || 'A&M Advisory';
  const description = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] || 'A&M Advisory redevelopment and property-management services.';
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i)?.[1] || `https://www.aquireandmanage.com/${file.replace(/\.html$/, '')}`;
  const additions = [];

  if (!/rel="manifest"/i.test(html)) additions.push('  <link rel="manifest" href="site.webmanifest" />');
  if (!/property="og:type"/i.test(html)) additions.push('  <meta property="og:type" content="website" />');
  if (!/property="og:title"/i.test(html)) additions.push(`  <meta property="og:title" content="${escapeAttribute(title)}" />`);
  if (!/property="og:description"/i.test(html)) additions.push(`  <meta property="og:description" content="${escapeAttribute(description)}" />`);
  if (!/property="og:url"/i.test(html)) additions.push(`  <meta property="og:url" content="${escapeAttribute(canonical)}" />`);
  if (!/property="og:image"/i.test(html)) additions.push('  <meta property="og:image" content="https://www.aquireandmanage.com/images/am-logo.png" />');
  if (!/name="twitter:card"/i.test(html)) additions.push('  <meta name="twitter:card" content="summary_large_image" />');
  if (!/name="twitter:title"/i.test(html)) additions.push(`  <meta name="twitter:title" content="${escapeAttribute(title)}" />`);
  if (!/name="twitter:description"/i.test(html)) additions.push(`  <meta name="twitter:description" content="${escapeAttribute(description)}" />`);
  if (!/name="twitter:image"/i.test(html)) additions.push('  <meta name="twitter:image" content="https://www.aquireandmanage.com/images/am-logo.png" />');
  if (additions.length) html = html.replace(/<\/head>/i, `${additions.join('\n')}\n</head>`);

  if (!/href="css\/cookie-consent\.css"/i.test(html)) {
    html = html.replace(/<\/head>/i, '  <link rel="stylesheet" href="css/cookie-consent.css" />\n</head>');
  }
  if (!/src="js\/cookie-consent\.js"/i.test(html)) {
    html = html.replace(/<\/body>/i, '  <script src="js/cookie-consent.js"></script>\n</body>');
  }

  html = html.replace(/href="([a-z0-9-]+)\.html([#?][^"]*)?"/gi, 'href="$1$2"');
  html = html.replace(/href="index([#?][^"]*)?"/gi, 'href="/$1"');
  html = html.replace(/\+91 022-45648350/g, '+91 22 4564 8350');
  html = html.replace(/<select\b(?![^>]*\baria-label=)([^>]*\blanguage-select\b[^>]*)>/gi, '<select aria-label="Website language"$1>');
  html = html.replace(/<input\b(?![^>]*\baria-label=)([^>]*\bid="site-search-input"[^>]*)>/gi, '<input aria-label="Search website"$1>');
  html = html.replace(/<button\b(?![^>]*\baria-label=)([^>]*\bid="search-modal-close"[^>]*)>/gi, '<button aria-label="Close search"$1>');
  html = html.replace(/<button\b(?![^>]*\baria-label=)([^>]*\bid="chatbot-close-btn"[^>]*)>/gi, '<button aria-label="Close chatbot"$1>');

  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  for (const tag of imageTags) {
    let updated = tag;
    if (!/\bdecoding=/i.test(updated)) updated = updated.replace(/<img/i, '<img decoding="async"');
    const priority = /am-logo|a&mwhitelogo|didi-avatar|fetchpriority="high"/i.test(updated);
    if (!priority && !/\bloading=/i.test(updated)) updated = updated.replace(/<img/i, '<img loading="lazy"');
    const size = await getLocalImageSize(updated);
    if (size) {
      if (!/\bwidth=/i.test(updated)) updated = updated.replace(/<img/i, `<img width="${size[0]}"`);
      if (!/\bheight=/i.test(updated)) updated = updated.replace(/<img/i, `<img height="${size[1]}"`);
    }
    html = html.replace(tag, updated);
  }

  if (/<footer\b/i.test(html) && !/aria-label="Legal"/i.test(html)) {
    const legalNav = '    <nav aria-label="Legal" class="mx-auto max-w-6xl border-t border-white/10 px-6 py-5 text-center text-xs text-slate-300"><a href="privacy" class="mx-2 hover:text-white">Privacy</a><a href="terms" class="mx-2 hover:text-white">Terms</a><a href="disclaimer" class="mx-2 hover:text-white">Disclaimer</a></nav>\n';
    html = html.replace(/<\/footer>/i, `${legalNav}</footer>`);
  }

  await fs.writeFile(filePath, html, 'utf8');
}

console.log(`Normalized ${files.length} HTML pages.`);
