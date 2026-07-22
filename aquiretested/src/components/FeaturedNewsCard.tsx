import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { NewsArticle } from '../types/news';

export default function FeaturedNewsCard({ article }: { article: NewsArticle }) {
  return (
    <motion.article initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative mb-10 min-h-[420px] overflow-hidden rounded-2xl bg-navy shadow-xl">
      {article.imageUrl && <img src={article.imageUrl} alt={article.title} loading="eager" decoding="async" className="absolute inset-0 h-full w-full object-cover" />}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
      <div className="relative flex min-h-[420px] max-w-3xl flex-col items-start justify-end p-7 text-white md:p-10">
        <div className="mb-4 flex gap-2"><span className="rounded-full bg-crimson px-3 py-1 text-xs font-bold uppercase">Breaking</span><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">Featured</span></div>
        <h2 className="text-3xl leading-tight md:text-4xl">{article.title}</h2>
        {article.description && <p className="mt-4 line-clamp-2 text-white/80">{article.description}</p>}
        <div className="mt-4 text-sm text-white/70">{article.source}</div>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 font-bold text-navy transition hover:-translate-y-1 hover:shadow-lg active:scale-95">Read More <ExternalLink size={16} /></a>
      </div>
    </motion.article>
  );
}
