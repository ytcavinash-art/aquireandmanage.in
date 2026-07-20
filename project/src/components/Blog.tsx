import { ArrowRight, CalendarDays } from 'lucide-react';
import { blogPosts } from '../blogData';

export default function Blog() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <p className="text-crimson text-sm font-semibold tracking-widest uppercase mb-3">Knowledge &amp; Insights</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-navy mb-5">A&amp;M Advisory Blog</h1>
          <p className="text-gray-500 leading-relaxed">
            Practical perspectives on redevelopment planning, compliance, stakeholder engagement, and project execution.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((article) => (
            <article key={article.title} className="flex flex-col rounded-xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-crimson/30">
              <p className="text-xs font-semibold uppercase tracking-wider text-crimson mb-6">{article.eyebrow}</p>
              <h2 className="text-xl font-bold leading-snug text-navy mb-4">{article.title}</h2>
              <p className="text-sm leading-relaxed text-gray-500 mb-7">{article.intro}</p>
              <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5">
                <span className="inline-flex items-center gap-2 text-xs font-medium text-gray-400">
                  <CalendarDays size={15} aria-hidden="true" />
                  {article.category}
                </span>
                <a href={`/blog-${article.slug}.html`} className="inline-flex items-center gap-1 text-sm font-semibold text-navy transition-colors hover:text-crimson">
                  Read more <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
