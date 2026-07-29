import cron from 'node-cron';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const projectDirectory = join(currentDirectory, '..');
const blogsDirectory = join(projectDirectory, 'public', 'blogs');
const indexPath = join(blogsDirectory, 'blogs-list.json');
const apiKey = process.env.NEWS_API_KEY;
const query = 'Mumbai real estate OR slum rehabilitation';
const endpoint = new URL('https://newsapi.org/v2/everything');

endpoint.search = new URLSearchParams({
  q: query,
  language: 'en',
  sortBy: 'publishedAt',
  pageSize: '1',
  apiKey: apiKey ?? '',
}).toString();

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function readBlogIndex() {
  if (!existsSync(indexPath)) return [];

  try {
    const parsedIndex = JSON.parse(readFileSync(indexPath, 'utf8'));
    return Array.isArray(parsedIndex) ? parsedIndex : [];
  } catch (error) {
    console.error('Unable to read blogs-list.json:', error);
    return [];
  }
}

function updateBlogIndex(newBlog) {
  const blogsList = readBlogIndex();
  blogsList.unshift(newBlog);
  writeFileSync(indexPath, JSON.stringify(blogsList, null, 2), 'utf8');
}

export async function generateAutoBlog() {
  if (!apiKey) {
    console.error('NEWS_API_KEY is not set. Auto-blog generation was skipped.');
    return;
  }

  try {
    console.log('Fetching latest news for auto-blog...');
    const response = await fetch(endpoint);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `NewsAPI request failed with status ${response.status}.`);
    }

    const article = data.articles?.[0];
    if (!article) {
      console.log('No new articles found.');
      return;
    }

    mkdirSync(blogsDirectory, { recursive: true });

    const blogsList = readBlogIndex();
    if (blogsList.some((blog) => blog.sourceUrl === article.url)) {
      console.log('The latest article has already been published.');
      return;
    }

    const publishedAt = article.publishedAt ? new Date(article.publishedAt) : new Date();
    const publishDate = Number.isNaN(publishedAt.getTime())
      ? new Date().toISOString().slice(0, 10)
      : publishedAt.toISOString().slice(0, 10);
    const fileName = `blog-${Date.now()}.html`;
    const blogTitle = escapeHtml(article.title || 'Latest Real Estate News');
    const blogDescription = escapeHtml(article.description || '');
    const blogContent = escapeHtml(article.content || 'Full content is available at the original source.');
    const sourceUrl = escapeHtml(article.url || '#');

    const blogHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${blogTitle}</title>
  <style>
    body { margin: 0; padding: 40px 20px; background: #f4f4f9; color: #333; font-family: Arial, sans-serif; }
    .blog-post { max-width: 800px; margin: auto; padding: 30px; border-radius: 8px; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,.1); }
    h1 { margin-top: 0; color: #10254c; line-height: 1.25; }
    .date { display: block; margin-bottom: 24px; color: #64748b; font-size: 14px; }
    p { line-height: 1.7; }
    .read-more { display: inline-block; margin-top: 16px; color: #0066cc; font-weight: bold; text-decoration: none; }
    .read-more:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <article class="blog-post">
    <h1>${blogTitle}</h1>
    <span class="date">Published on: ${publishDate}</span>
    <p class="desc"><strong>Overview:</strong> ${blogDescription}</p>
    <div class="content"><p>${blogContent}</p></div>
    <a href="${sourceUrl}" target="_blank" rel="noopener noreferrer" class="read-more">Read Original Source</a>
  </article>
</body>
</html>`;

    writeFileSync(join(blogsDirectory, fileName), blogHtml, 'utf8');
    updateBlogIndex({
      title: article.title || 'Latest Real Estate News',
      file: fileName,
      date: publishDate,
      sourceUrl: article.url,
    });

    console.log(`[Success] New auto-blog created: ${fileName}`);
  } catch (error) {
    console.error('Error generating auto-blog:', error);
  }
}

cron.schedule(
  '0 9 * * *',
  () => {
    console.log('Running daily scheduled auto-blog task...');
    void generateAutoBlog();
  },
  { timezone: 'Asia/Kolkata' },
);

console.log('Auto-blog scheduler is running. Daily schedule: 9:00 AM Asia/Kolkata.');

if (process.argv.includes('--run-now')) {
  void generateAutoBlog();
}
