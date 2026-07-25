import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search } from 'lucide-react';

const faqs = [
  {
    question: 'What is an SRA redevelopment project in Mumbai?',
    answer: 'An SRA project is a rehabilitation initiative designed to provide eligible residents with permanent housing while enabling planned redevelopment under the applicable Slum Rehabilitation Authority rules.',
    category: 'SRA Basics',
  },
  {
    question: 'How do I know whether I am eligible for rehabilitation?',
    answer: 'Eligibility depends on the project, applicable government rules, and supporting documents. Our team can help residents understand the document-verification process and coordinate with the relevant authorities.',
    category: 'Eligibility & Documents',
  },
  {
    question: 'Which documents may be required from tenants?',
    answer: 'Commonly requested records may include identity, address, occupancy, family, and bank-related documents. The exact requirements vary by project and authority, so residents should follow the official project checklist.',
    category: 'Eligibility & Documents',
  },
  {
    question: 'How are rent, shifting, and temporary accommodation handled?',
    answer: 'These arrangements depend on the individual redevelopment agreement. We support rent readiness, bank and KYC coordination, shifting planning, and communication between residents and project stakeholders.',
    category: 'Rent & Relocation',
  },
  {
    question: 'Can you help with SRA and municipal approvals?',
    answer: 'Yes. Our liaisoning team coordinates submissions, follow-ups, compliance documentation, NOCs, and communication with SRA, municipal, and other relevant authorities.',
    category: 'Approvals',
  },
  {
    question: 'How can residents raise questions or concerns?',
    answer: 'Residents can contact our team through the website, attend scheduled community meetings, or use the communication and grievance channels arranged for their project.',
    category: 'Resident Support',
  },
];

export default function FAQ() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...new Set(faqs.map((faq) => faq.category))];
  const filteredFaqs = useMemo(() => {
    const search = query.trim().toLowerCase();
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      const matchesSearch = !search || `${faq.question} ${faq.answer}`.toLowerCase().includes(search);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, query]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section id="faq" className="scroll-mt-20 bg-slate-50 py-16 md:py-20" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-crimson">Mumbai SRA Guidance</p>
            <h2 id="faq-heading" className="text-3xl font-bold text-navy md:text-4xl">
              SRA Redevelopment FAQs in Mumbai
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Answers to common questions from residents, tenants, developers, and redevelopment stakeholders in Mumbai.
            </p>
          </div>

          <div className="mb-8 border border-slate-200 bg-white p-4 shadow-sm md:p-5">
            <div className="relative">
              <label htmlFor="faq-search" className="sr-only">Search frequently asked questions</label>
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search eligibility, documents, approvals, rent..."
                className="h-12 w-full border border-slate-300 bg-slate-50 pl-12 pr-4 text-sm text-navy placeholder:text-slate-400 focus:border-navy focus:bg-white"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2" aria-label="Filter FAQs by category">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
                    activeCategory === category
                      ? 'border-navy bg-navy text-white'
                      : 'border-slate-300 bg-white text-slate-600 hover:border-navy hover:text-navy'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <p className="mb-4 text-xs font-semibold text-slate-400" aria-live="polite">
            Showing {filteredFaqs.length} {filteredFaqs.length === 1 ? 'answer' : 'answers'}
          </p>

          <div className="space-y-3">
            {filteredFaqs.map((faq) => (
              <details key={faq.question} className="group border border-slate-200 bg-white shadow-sm transition open:border-crimson/30 open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-navy md:px-6">
                  <span>
                    <span className="mb-1 block text-[9px] font-bold uppercase tracking-[0.16em] text-crimson">{faq.category}</span>
                    {faq.question}
                  </span>
                  <span className="text-2xl font-normal text-crimson transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="border-t border-slate-100 px-5 py-4 leading-7 text-slate-600 md:px-6">{faq.answer}</p>
              </details>
            ))}

            {filteredFaqs.length === 0 && (
              <div className="border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
                <h3 className="text-xl font-bold text-navy">No matching questions found</h3>
                <p className="mt-2 text-sm text-slate-500">Try another keyword or browse all categories.</p>
                <button type="button" onClick={() => { setQuery(''); setActiveCategory('All'); }} className="mt-5 text-sm font-bold text-crimson underline underline-offset-4">
                  Clear search and filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
