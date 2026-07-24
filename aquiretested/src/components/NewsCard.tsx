import { formatDistanceToNow, isValid } from 'date-fns';
import { motion } from 'framer-motion';
import { Building2, Calendar, ExternalLink } from 'lucide-react';
import type { NewsArticle } from '../types/news';
import { getNewsImageUrl, useNewsImageFallback } from '../lib/newsImage';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const publishedDate = new Date(article.publishedAt);
  const relativeDate = isValid(publishedDate)
    ? formatDistanceToNow(publishedDate, { addSuffix: true })
    : 'Date unavailable';

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group overflow-hidden rounded-2xl bg-white text-slate-900 shadow transition-all duration-300 hover:shadow-2xl dark:bg-zinc-900 dark:text-white"
    >
      <div className="h-60 overflow-hidden bg-slate-100 dark:bg-zinc-800">
        <img
          loading="lazy"
          decoding="async"
          src={getNewsImageUrl(article.imageUrl)}
          alt={article.title}
          referrerPolicy="no-referrer"
          onError={useNewsImageFallback}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400">
          <Building2 size={16} aria-hidden="true" />
          {article.source || 'Google News'}
        </div>

        <h2 className="line-clamp-2 text-xl font-bold text-navy dark:text-white">
          {article.title}
        </h2>

        {article.description && (
          <p className="mt-3 line-clamp-3 text-slate-600 dark:text-zinc-300">
            {article.description}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <time dateTime={article.publishedAt} className="flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400">
            <Calendar size={15} aria-hidden="true" />
            {relativeDate}
          </time>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-medium text-mediumBlue transition hover:text-navy dark:text-blue-400 dark:hover:text-blue-300"
          >
            Read More
            <ExternalLink size={18} aria-hidden="true" />
            <span className="sr-only"> about {article.title}</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
