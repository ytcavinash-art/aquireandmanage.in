import Parser from 'rss-parser';
import newsDecoderPackage from 'google-news-url-decoder';

const parser = new Parser({
  customFields: {
    item: [['source', 'source']],
  },
});
const { GoogleDecoder } = newsDecoderPackage;
const newsUrlDecoder = new GoogleDecoder();

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

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#x2F;/gi, '/');
}

function getMetadataImage(html, pageUrl) {
  const patterns = [
    /<meta[^>]+(?:property|name)=["'](?:og:image|og:image:url|twitter:image|twitter:image:src)["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["'](?:og:image|og:image:url|twitter:image|twitter:image:src)["'][^>]*>/i,
    /<link[^>]+rel=["']image_src["'][^>]+href=["']([^"']+)["'][^>]*>/i,
    /"image"\s*:\s*(?:\[\s*)?(?:{\s*"url"\s*:\s*)?["']([^"']+)["']/i,
  ];

  for (const pattern of patterns) {
    const candidate = pattern.exec(html)?.[1];
    if (!candidate) continue;

    try {
      const imageUrl = new URL(decodeHtml(candidate), pageUrl);
      if (imageUrl.protocol === 'http:' || imageUrl.protocol === 'https:') {
        return imageUrl.toString();
      }
    } catch {
      // Ignore malformed metadata and try the next available image field.
    }
  }

  return '';
}

async function addOriginalArticleImage(article) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4500);

  try {
    const articleResponse = await fetch(article.url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        Accept: 'text/html,application/xhtml+xml',
        'User-Agent': 'Mozilla/5.0 (compatible; A&M-Advisory-News/1.0)',
      },
    });

    if (!articleResponse.ok) return article;
    if (articleResponse.url.includes('news.google.com')) return article;

    const html = await articleResponse.text();
    const imageUrl = getMetadataImage(html, articleResponse.url);

    return {
      ...article,
      url: articleResponse.url,
      imageUrl,
    };
  } catch {
    return article;
  } finally {
    clearTimeout(timeout);
  }
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
    const articlesToEnrich = articles.slice(0, PAGE_SIZE);
    const decodedBySourceUrl = new Map();

    for (const article of articlesToEnrich) {
      try {
        const decodedResult = await newsUrlDecoder.decode(article.url);
        decodedBySourceUrl.set(article.url, decodedResult);
      } catch (error) {
        console.warn(`Unable to decode Google News URL for "${article.title}":`, error);
      }
    }

    const articlesWithImages = await Promise.all(
      articles.map((article, index) => {
        if (index >= PAGE_SIZE) return article;

        const decodedResult = decodedBySourceUrl.get(article.url);
        const publisherUrl = decodedResult?.status && decodedResult.decoded_url
          ? decodedResult.decoded_url
          : article.url;

        return addOriginalArticleImage({ ...article, url: publisherUrl });
      }),
    );
    const nextPage = hasRequestedPage && start + PAGE_SIZE < uniqueArticles.length
      ? page + 1
      : undefined;

    response.setHeader(
      'Cache-Control',
      's-maxage=900, stale-while-revalidate',
    );
    return response.status(200).json({ articles: articlesWithImages, nextPage });
  } catch (error) {
    console.error('News RSS request failed:', error);
    return response.status(500).json({
      error: error instanceof Error ? error.message : 'Unable to load live news.',
    });
  }
}
