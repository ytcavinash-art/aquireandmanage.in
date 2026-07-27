import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import Footer from './components/Footer';
import Nav from './components/Nav';
import NewsWidget from './components/NewsWidget';
import './index.css';

export function NewsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased dark:bg-zinc-950">
      <Nav />
      <main id="main-content" className="min-h-screen pt-16" tabIndex={-1}>
        <section className="bg-navy px-6 py-16 text-center text-white">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">News &amp; Updates</p>
          <h1 className="text-4xl md:text-5xl">Latest Mumbai Redevelopment News</h1>
        </section>
        <section className="mx-auto max-w-7xl px-6 py-14" aria-label="Latest news articles">
          <NewsWidget />
        </section>
      </main>
      <Footer />
    </div>
  );
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}><HelmetProvider><NewsPage /></HelmetProvider></QueryClientProvider>
  </React.StrictMode>,
);
