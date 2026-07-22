const newsContainer = document.getElementById('news-feed');

function showMessage(message) {
  if (!newsContainer) return;

  const paragraph = document.createElement('p');
  paragraph.textContent = message;
  newsContainer.replaceChildren(paragraph);
}

function renderArticles(articles) {
  if (!newsContainer) return;

  const fragment = document.createDocumentFragment();

  articles.forEach((article) => {
    const card = document.createElement('article');
    card.className = 'news-card';

    const title = document.createElement('h2');
    title.textContent = article.title || 'Untitled article';

    const description = document.createElement('p');
    description.textContent = article.description || 'No description available.';

    if (article.source || article.publishedAt) {
      const metadata = document.createElement('p');
      const publishedDate = article.publishedAt
        ? new Date(article.publishedAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        : '';
      metadata.textContent = [article.source, publishedDate].filter(Boolean).join(' • ');
      card.append(title, metadata, description);
    } else {
      card.append(title, description);
    }

    const link = document.createElement('a');
    link.href = article.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Read Full Article';

    card.append(link);
    fragment.append(card);
  });

  newsContainer.replaceChildren(fragment);
}

async function fetchNews() {
  if (!newsContainer) return;

  try {
    const response = await fetch('/api/news');
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'News request failed.');
    }

    if (Array.isArray(data.articles) && data.articles.length > 0) {
      renderArticles(data.articles);
    } else {
      showMessage('No recent news found.');
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    showMessage('Failed to load live news.');
  }
}

fetchNews();
