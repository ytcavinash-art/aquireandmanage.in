import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ExternalLink, Search, TrendingUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from './blogData';
import Footer from './components/Footer';
import Nav from './components/Nav';
import NewsletterSignup from './components/NewsletterSignup';
import { fetchBlogPosts, type ApiBlogPost } from './services/blogApi';

const articleImages: Record<string, string> = {
  'sra-redevelopment': '/images/sra-project.png',
  'community-engagement': '/images/iec-activities.png',
  'regulatory-compliance': '/images/liaisoning.png',
};

export default function BlogPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [apiPosts, setApiPosts] = useState<ApiBlogPost[]>([]);
  const [liveStatus, setLiveStatus] = useState<'loading' | 'ready' | 'fallback'>('loading');

  useEffect(() => {
    const controller = new AbortController();
    fetchBlogPosts(controller.signal)
      .then((posts) => {
        setApiPosts(posts);
        setLiveStatus('ready');
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setLiveStatus('fallback');
      });
    return () => controller.abort();
  }, []);

  const categories = useMemo(
    () => ['All', ...new Set([...blogPosts.map((post) => post.eyebrow), ...apiPosts.map((post) => post.category)])],
    [apiPosts],
  );

  const filteredPosts = useMemo(() => {
    const search = query.trim().toLowerCase();
    return blogPosts.filter((post) => {
      const matchesCategory = category === 'All' || post.eyebrow === category;
      const matchesSearch = !search || `${post.title} ${post.intro} ${post.eyebrow}`.toLowerCase().includes(search);
      return matchesCategory && matchesSearch;
    });
  }, [category, query]);

  const filteredApiPosts = useMemo(() => {
    const search = query.trim().toLowerCase();
    return apiPosts.filter((post) => {
      const matchesCategory = category === 'All' || post.category === category;
      const matchesSearch = !search || `${post.title} ${post.description} ${post.category}`.toLowerCase().includes(search);
      return matchesCategory && matchesSearch;
    });
  }, [apiPosts, category, query]);

  return (
    <div className="font-sans antialiased">
      <Helmet>
        <title>Redevelopment Insights &amp; SRA Articles | A&amp;M Advisory</title>
        <meta name="description" content="Explore practical insights on Mumbai SRA redevelopment, stakeholder engagement, government approvals and regulatory compliance." />
      </Helmet>
      <Nav />

      <main id="main-content" tabIndex={-1} className="pt-16">
        <section className="bg-navy px-6 py-16 text-white md:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ff6985]">Knowledge &amp; Insights</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl">
              Ideas That Move Redevelopment Forward
            </h1>
            <p className="mt-5 max-w-2xl leading-7 text-slate-300">
              Practical perspectives on SRA planning, community trust, compliance and project execution.
            </p>
          </div>
        </section>

        <section className="bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 flex flex-col gap-5 border-b border-slate-200 pb-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2" aria-label="Filter articles by category">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    aria-pressed={category === item}
                    className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
                      category === item ? 'border-navy bg-navy text-white' : 'border-slate-300 bg-white text-slate-600 hover:border-navy hover:text-navy'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-80">
                <label htmlFor="blog-search" className="sr-only">Search articles</label>
                <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  id="blog-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search insights..."
                  className="h-11 w-full border border-slate-300 bg-white pl-11 pr-4 text-sm text-navy placeholder:text-slate-400 focus:border-navy"
                />
              </div>
            </div>

            <div className="grid gap-9 lg:grid-cols-[1fr_320px]">
              <div>
                {liveStatus === 'loading' && (
                  <p role="status" className="mb-5 text-xs font-semibold text-slate-400">Checking for the latest industry updates…</p>
                )}
                {filteredApiPosts.length > 0 && (
                  <div className="mb-9">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <h2 className="text-2xl font-bold text-navy">Latest Industry Updates</h2>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">Auto updated</span>
                    </div>
                    <div className="grid gap-7 md:grid-cols-2">
                      {filteredApiPosts.map((post) => (
                        <article key={post._id} className="group flex flex-col overflow-hidden border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                          <div className="h-44 overflow-hidden bg-navy">
                            {post.image ? (
                              <img src={post.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                            ) : (
                              <div className="grid h-full place-items-center px-6 text-center text-sm font-bold text-white/60">A&amp;M Industry Update</div>
                            )}
                          </div>
                          <div className="flex flex-1 flex-col p-6">
                            <div className="flex items-center justify-between gap-3">
                              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-crimson">{post.category}</p>
                              <time className="text-[10px] text-slate-400">{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                            </div>
                            <h3 className="mt-3 text-xl font-bold leading-snug text-navy">{post.title}</h3>
                            <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{post.description}</p>
                            <a href={post.sourceUrl} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-navy hover:text-crimson">
                              Read at {post.sourceName || 'source'} <ExternalLink size={14} aria-hidden="true" />
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid gap-7 md:grid-cols-2">
                  {filteredPosts.map((post) => (
                    <article key={post.slug} className="group flex flex-col overflow-hidden border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                      <a href={`/blog-${post.slug}.html`} className="block h-52 overflow-hidden bg-slate-200" tabIndex={-1} aria-hidden="true">
                        <img src={articleImages[post.slug]} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                      </a>
                      <div className="flex flex-1 flex-col p-6">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-crimson">{post.eyebrow}</p>
                        <h2 className="mt-3 text-2xl font-bold leading-snug text-navy">
                          <a href={`/blog-${post.slug}.html`} className="transition hover:text-crimson">{post.title}</a>
                        </h2>
                        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{post.intro}</p>
                        <a href={`/blog-${post.slug}.html`} className="group/link mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-navy transition hover:text-crimson">
                          Read Article
                          <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>

                {filteredPosts.length === 0 && filteredApiPosts.length === 0 && liveStatus !== 'loading' && (
                  <div className="border border-slate-200 bg-white px-6 py-16 text-center">
                    <h2 className="text-xl font-bold text-navy">No matching articles</h2>
                    <p className="mt-2 text-sm text-slate-500">Try another keyword or category.</p>
                    <button type="button" onClick={() => { setQuery(''); setCategory('All'); }} className="mt-5 text-sm font-bold text-crimson underline underline-offset-4">Clear filters</button>
                  </div>
                )}
              </div>

              <aside className="space-y-7">
                <div className="border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="flex items-center gap-2 text-lg font-bold text-navy">
                    <TrendingUp size={19} className="text-crimson" aria-hidden="true" />
                    Popular Articles
                  </h2>
                  <ol className="mt-5 divide-y divide-slate-100">
                    {blogPosts.map((post, index) => (
                      <li key={post.slug} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                        <span className="font-serif text-3xl font-bold leading-none text-slate-200">0{index + 1}</span>
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-wider text-crimson">{post.eyebrow}</p>
                          <a href={`/blog-${post.slug}.html`} className="mt-1 block text-sm font-bold leading-5 text-navy transition hover:text-crimson">{post.title}</a>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                <NewsletterSignup compact />
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
