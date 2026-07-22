import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: [['source', 'source']],
  },
});

const FEED_URL =
  'https://news.google.com/rss/search?q=Mumbai+SRA+OR+Slum+Redevelopment+OR+MHADA+OR+Dharavi&hl=en-IN&gl=IN&ceid=IN:en';
const KEYWORDS = [
  'sra',
  'slum',
  'rehabilitation',
  'redevelopment',
  'real estate',
  'mhada',
  'dharavi',
  'mumbai',
  'housing',
];
const PAGE_SIZE = 6;

function getSource(item) {
  if (typeof item.source === 'string') return item.source;
  if (item.source && typeof item.source === 'object') {
    return item.source._ || item.source.title || item.source.name || 'Google News';
  }
  return item.creator || 'Google News';
}

function isRelevant(item) {
  const text = `${item.title || ''} ${item.contentSnippet || ''}`.toLowerCase();
  return KEYWORDS.some((keyword) => text.includes(keyword));
}

function normalizeArticle(item) {
  return {
    title: item.title || 'Untitled article',
    description: item.contentSnippet || '',
    url: item.link || '',
    imageUrl: '',
    source: getSource(item),
    publishedAt: item.isoDate || item.pubDate || '',
  };
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const feed = await parser.parseURL(FEED_URL);
    const uniqueArticles = [];
    const seenTitles = new Set();

    for (const item of feed.items) {
      if (!isRelevant(item)) continue;

      const article = normalizeArticle(item);
      const titleKey = article.title.trim().toLowerCase();
      if (!article.url || seenTitles.has(titleKey)) continue;

      seenTitles.add(titleKey);
      uniqueArticles.push(article);
    }

    uniqueArticles.sort(
      (first, second) =>
        new Date(second.publishedAt).getTime() - new Date(first.publishedAt).getTime(),
    );

    const requestedPage = request.query?.page;
    const page = Number.parseInt(String(requestedPage || '1'), 10);
    const hasRequestedPage = requestedPage !== undefined;
    const start = (page - 1) * PAGE_SIZE;
    const articles = hasRequestedPage
      ? uniqueArticles.slice(start, start + PAGE_SIZE)
      : uniqueArticles;
    const nextPage = hasRequestedPage && start + PAGE_SIZE < uniqueArticles.length
      ? page + 1
      : undefined;

    response.setHeader(
      'Cache-Control',
      's-maxage=900, stale-while-revalidate',
    );
    return response.status(200).json({ articles, nextPage });
  } catch (error) {
    console.error('News RSS request failed:', error);
    return response.status(500).json({
      error: error instanceof Error ? error.message : 'Unable to load live news.',
    });
  }
}
