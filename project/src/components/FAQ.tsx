import { Helmet } from 'react-helmet-async';

const faqs = [
  {
    question: 'What is an SRA redevelopment project in Mumbai?',
    answer: 'An SRA project is a rehabilitation initiative designed to provide eligible residents with permanent housing while enabling planned redevelopment under the applicable Slum Rehabilitation Authority rules.',
  },
  {
    question: 'How do I know whether I am eligible for rehabilitation?',
    answer: 'Eligibility depends on the project, applicable government rules, and supporting documents. Our team can help residents understand the document-verification process and coordinate with the relevant authorities.',
  },
  {
    question: 'Which documents may be required from tenants?',
    answer: 'Commonly requested records may include identity, address, occupancy, family, and bank-related documents. The exact requirements vary by project and authority, so residents should follow the official project checklist.',
  },
  {
    question: 'How are rent, shifting, and temporary accommodation handled?',
    answer: 'These arrangements depend on the individual redevelopment agreement. We support rent readiness, bank and KYC coordination, shifting planning, and communication between residents and project stakeholders.',
  },
  {
    question: 'Can you help with SRA and municipal approvals?',
    answer: 'Yes. Our liaisoning team coordinates submissions, follow-ups, compliance documentation, NOCs, and communication with SRA, municipal, and other relevant authorities.',
  },
  {
    question: 'How can residents raise questions or concerns?',
    answer: 'Residents can contact our team through the website, attend scheduled community meetings, or use the communication and grievance channels arranged for their project.',
  },
];

export default function FAQ() {
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
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-crimson">Mumbai SRA Guidance</p>
            <h2 id="faq-heading" className="text-3xl font-bold text-navy md:text-4xl">
              SRA Redevelopment FAQs in Mumbai
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Answers to common questions from residents, tenants, developers, and redevelopment stakeholders in Mumbai.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-lg border border-slate-200 bg-white shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-navy">
                  {faq.question}
                  <span className="text-2xl font-normal text-crimson transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="border-t border-slate-100 px-5 py-4 leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
