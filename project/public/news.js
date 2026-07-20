const apiKey = 'YOUR_NEWS_API_KEY';
const keyword = 'Mumbai real estate OR slum rehabilitation OR SRA';
const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&language=en&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`;
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

    const link = document.createElement('a');
    link.href = article.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Read Full Article';

    card.append(title, description, link);
    fragment.append(card);
  });

  newsContainer.replaceChildren(fragment);
}

async function fetchNews() {
  if (!newsContainer) return;

  if (apiKey === 'YOUR_NEWS_API_KEY') {
    showMessage('Add your NewsAPI key in news.js to load live news.');
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'News request failed.');
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
