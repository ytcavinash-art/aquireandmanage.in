import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNews } from '../hooks/useNews';
import NewsCard from './NewsCard';
import NewsSkeleton from './NewsSkeleton';

const filters = ['All', 'SRA', 'MHADA', 'Dharavi', 'Redevelopment', 'Real Estate'];

export default function NewsWidget() {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useNews();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const { ref, inView } = useInView({ rootMargin: '300px' });
  const articles = data?.pages.flatMap((page) => page.articles) ?? [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3" aria-label="Loading news" aria-busy="true">
        {Array.from({ length: 6 }, (_, index) => (
          <NewsSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="py-20 text-center text-slate-600 dark:text-zinc-300">
        Failed to load news.
      </div>
    );
  }

  const filteredArticles = articles.filter((article) => {
    const title = article.title.toLowerCase();
    const searchableText = [article.title, article.description, article.source].join(' ').toLowerCase();
    const matchesSearch = title.includes(search.trim().toLowerCase());
    const matchesFilter = activeFilter === 'All' || searchableText.includes(activeFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <h2 className="mb-8 text-4xl font-bold text-navy dark:text-white">
        Latest Mumbai Redevelopment News
      </h2>

      <label htmlFor="news-search" className="sr-only">Search redevelopment news</label>
      <input
        id="news-search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search redevelopment news..."
        className="mb-8 w-full rounded-xl border p-4"
      />

      <div className="mb-8 flex flex-wrap gap-3" aria-label="Filter news by topic">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              activeFilter === filter
                ? 'border-navy bg-navy text-white'
                : 'border-slate-300 bg-white text-slate-600 hover:border-navy hover:text-navy'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {filteredArticles.length ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredArticles.map((article) => (
            <NewsCard key={article.url} article={article} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl bg-white px-6 py-16 text-center text-slate-600 shadow-sm dark:bg-zinc-900 dark:text-zinc-300">
          No news found for “{search}”.
        </p>
      )}

      <div ref={ref} className="mt-10 min-h-8 text-center font-medium text-slate-500" aria-live="polite">
        {isFetchingNextPage ? 'Loading More...' : ''}
      </div>
    </div>
  );
}
