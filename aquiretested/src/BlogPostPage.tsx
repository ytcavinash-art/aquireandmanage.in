import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { blogPosts } from './blogData';
import Footer from './components/Footer';
import Nav from './components/Nav';
import NewsletterSignup from './components/NewsletterSignup';
import Breadcrumbs from './components/Breadcrumbs';

export default function BlogPostPage() {
  const slug = window.location.pathname.match(/blog-(.+?)(?:\.html)?$/)?.[1];
  const post = blogPosts.find((item) => item.slug === slug) ?? blogPosts[0];
  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <div className="font-sans antialiased">
      <Nav />
      <main id="main-content" tabIndex={-1} className="pt-16">
        <article className="py-20 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <Breadcrumbs items={[{ label: 'Blog', href: '/blog.html' }, { label: post.title }]} />
            <a href="/blog.html" className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-crimson mb-10">
              <ArrowLeft size={17} aria-hidden="true" /> Back to Blog
            </a>
            <p className="text-crimson text-sm font-semibold tracking-widest uppercase mb-4">{post.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-navy mb-7">{post.title}</h1>
            <p className="text-lg leading-relaxed text-gray-600 mb-7">{post.intro}</p>
            <div className="space-y-5 text-gray-500 leading-relaxed">
              {post.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>

            <section className="my-10 rounded-xl bg-gray-50 border border-slate-200 p-7">
              <h2 className="text-2xl font-bold text-navy mb-5">{post.listHeading}</h2>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {post.listItems.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-600">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-crimson" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <h2 className="text-2xl font-bold text-navy mb-3">{post.closingHeading}</h2>
            <p className="text-gray-500 leading-relaxed">{post.closing}</p>
            <p className="mt-10 text-xs font-semibold uppercase tracking-wider text-crimson">Category: {post.category}</p>
          </div>
        </article>
        <section className="bg-slate-50 py-16 md:py-20" aria-labelledby="related-posts-heading">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-crimson">Continue Reading</p>
            <h2 id="related-posts-heading" className="mt-2 text-3xl font-bold text-navy">Related Posts</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {relatedPosts.map((related) => (
                <article key={related.slug} className="flex flex-col border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-crimson">{related.eyebrow}</p>
                  <h3 className="mt-3 text-xl font-bold leading-snug text-navy">{related.title}</h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{related.intro}</p>
                  <a href={`/blog-${related.slug}.html`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-crimson">
                    Read Article <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  );
}
