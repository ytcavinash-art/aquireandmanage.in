import { useState } from 'react';
import { formatDistanceToNow, isValid } from 'date-fns';
import { motion } from 'framer-motion';
import {
  Bookmark,
  Building2,
  Calendar,
  Check,
  Clock3,
  ExternalLink,
  Share2,
} from 'lucide-react';
import type { NewsArticle } from '../types/news';
import { getNewsImageUrl, useNewsImageFallback } from '../lib/newsImage';

interface NewsCardProps {
  article: NewsArticle;
}

function inferCategory(article: NewsArticle) {
  const text = `${article.title} ${article.description}`.toLowerCase();
  if (text.includes('dharavi')) return 'Dharavi';
  if (text.includes('mhada')) return 'MHADA';
  if (text.includes('slum') || text.includes('rehabilitation')) return 'Slum Rehabilitation';
  if (text.includes('sra')) return 'SRA';
  if (text.includes('real estate') || text.includes('property')) return 'Real Estate';
  return 'Redevelopment';
}

function estimateReadingTime(article: NewsArticle) {
  const words = `${article.title} ${article.description || ''}`.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 180));
}

export default function NewsCard({ article }: NewsCardProps) {
  const bookmarkKey = `am-news-bookmark:${article.url}`;
  const [bookmarked, setBookmarked] = useState(() => {
    try {
      return localStorage.getItem(bookmarkKey) === 'true';
    } catch {
      return false;
    }
  });
  const [shareStatus, setShareStatus] = useState('');
  const publishedDate = new Date(article.publishedAt);
  const relativeDate = isValid(publishedDate)
    ? formatDistanceToNow(publishedDate, { addSuffix: true })
    : 'Date unavailable';
  const category = inferCategory(article);
  const readingTime = estimateReadingTime(article);

  const toggleBookmark = () => {
    const nextValue = !bookmarked;
    setBookmarked(nextValue);
    try {
      localStorage.setItem(bookmarkKey, String(nextValue));
    } catch {
      // Bookmark still works for this page session when storage is unavailable.
    }
  };

  const shareArticle = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: article.title, text: article.description, url: article.url });
        setShareStatus('Shared');
      } else {
        await navigator.clipboard.writeText(article.url);
        setShareStatus('Link copied');
      }
      window.setTimeout(() => setShareStatus(''), 2000);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setShareStatus('Unable to share');
      window.setTimeout(() => setShareStatus(''), 2000);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group flex h-full flex-col overflow-hidden border border-slate-200 bg-white text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-crimson/20 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
    >
      <div className="relative h-60 overflow-hidden bg-slate-100 dark:bg-zinc-800">
        <img
          loading="lazy"
          decoding="async"
          src={getNewsImageUrl(article.imageUrl)}
          alt={article.title}
          referrerPolicy="no-referrer"
          onError={useNewsImageFallback}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-black/10 opacity-70 transition-opacity group-hover:opacity-90" aria-hidden="true" />

        <span className="absolute left-4 top-4 rounded-full bg-crimson px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-lg">
          {category}
        </span>

        <div className="absolute right-4 top-4 flex gap-2">
          <button
            type="button"
            onClick={toggleBookmark}
            aria-label={bookmarked ? `Remove bookmark for ${article.title}` : `Bookmark ${article.title}`}
            aria-pressed={bookmarked}
            className={`grid h-9 w-9 place-items-center rounded-full shadow-lg backdrop-blur transition ${
              bookmarked ? 'bg-crimson text-white' : 'bg-white/90 text-navy hover:bg-white'
            }`}
          >
            <Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => void shareArticle()}
            aria-label={`Share ${article.title}`}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-navy shadow-lg backdrop-blur transition hover:bg-white"
          >
            {shareStatus === 'Link copied' || shareStatus === 'Shared' ? <Check size={16} aria-hidden="true" /> : <Share2 size={16} aria-hidden="true" />}
          </button>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 text-[11px] font-semibold text-white">
          <span className="inline-flex items-center gap-1.5"><Clock3 size={14} aria-hidden="true" />{readingTime} min read</span>
          <span className="line-clamp-1 rounded-full bg-black/35 px-3 py-1 backdrop-blur-sm">{article.source || 'Google News'}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-400">
          <Building2 size={14} aria-hidden="true" />
          Source: {article.source || 'Google News'}
        </div>

        <h2 className="line-clamp-2 text-xl font-bold leading-snug text-navy transition-colors group-hover:text-crimson dark:text-white">
          {article.title}
        </h2>

        {article.description && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-zinc-300">
            {article.description}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5 dark:border-zinc-800">
          <time dateTime={article.publishedAt} className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400">
            <Calendar size={14} aria-hidden="true" />
            {relativeDate}
          </time>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-2 text-sm font-bold text-navy transition hover:text-crimson dark:text-blue-400"
          >
            Read Article
            <ExternalLink size={15} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" aria-hidden="true" />
            <span className="sr-only"> about {article.title}</span>
          </a>
        </div>
        <p className="sr-only" aria-live="polite">{shareStatus}</p>
      </div>
    </motion.article>
  );
}
