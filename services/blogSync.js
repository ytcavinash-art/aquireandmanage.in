const BlogPost = require('../models/BlogPost');

function slugify(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 72);
}

function categoryFor(article) {
  const text = `${article.title || ''} ${article.description || ''}`.toLowerCase();
  if (text.includes('mhada')) return 'MHADA';
  if (text.includes('dharavi')) return 'Dharavi';
  if (text.includes('slum') || text.includes('rehabilitation')) return 'Slum Rehabilitation';
  if (text.includes('sra')) return 'SRA';
  return 'Redevelopment News';
}

async function syncAutomatedBlogs() {
  if (!process.env.NEWS_API_KEY) return { skipped: true, reason: 'NEWS_API_KEY is not configured.' };

  const url = new URL('https://newsapi.org/v2/everything');
  url.search = new URLSearchParams({
    q: 'Mumbai SRA OR slum rehabilitation OR MHADA OR Dharavi redevelopment',
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: '10',
    apiKey: process.env.NEWS_API_KEY,
  }).toString();

  const response = await fetch(url);
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.message || `News API returned ${response.status}.`);

  let created = 0;
  let updated = 0;
  for (const article of payload.articles || []) {
    if (!article.url || !article.title || article.title === '[Removed]') continue;
    const publishedAt = article.publishedAt ? new Date(article.publishedAt) : new Date();
    const result = await BlogPost.updateOne(
      { sourceUrl: article.url },
      { $set: {
        slug: `${slugify(article.title)}-${publishedAt.toISOString().slice(0, 10)}`,
        title: article.title,
        description: article.description || 'Read this redevelopment update from the original publisher.',
        image: article.urlToImage || '',
        author: article.author || article.source?.name || 'News Desk',
        category: categoryFor(article),
        sourceName: article.source?.name || 'External Publisher',
        sourceUrl: article.url,
        publishedAt,
        isPublished: true,
        isAutomated: true,
      } },
      { upsert: true },
    );
    if (result.upsertedCount) created += 1;
    else if (result.modifiedCount) updated += 1;
  }
  return { created, updated, fetched: payload.articles?.length || 0 };
}

module.exports = { syncAutomatedBlogs, slugify };
