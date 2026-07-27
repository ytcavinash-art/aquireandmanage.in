import { ArrowUpRight, Check, Clock3, Route } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const services = [
  {
    title: 'Tenant Management',
    description: 'Structured on-ground coordination from household survey to safe relocation.',
    href: '/tenant-management.html',
    image: '/images/tenant-management-service-card.jpg',
    benefits: ['Clear tenant records', 'Higher resident participation', 'Coordinated shifting support'],
    process: 'Survey → Documentation → Consent → Relocation',
    timeline: 'Project-phase based',
  },
  {
    title: 'Liaisoning',
    description: 'Focused coordination for submissions, statutory approvals and SRA compliance.',
    href: '/liaisoning.html',
    image: '/images/liaisoning-service-card.jpg',
    benefits: ['Organised submissions', 'Proactive follow-ups', 'Reduced compliance gaps'],
    process: 'Review → Submit → Coordinate → Close',
    timeline: 'Authority dependent',
  },
  {
    title: 'IEC Activities',
    description: 'Consistent, accessible communication that keeps every stakeholder informed.',
    href: '/iec-activities.html',
    image: '/images/iec-activities.jpg',
    benefits: ['Better project awareness', 'Faster query resolution', 'Stronger community trust'],
    process: 'Assess → Plan → Engage → Report',
    timeline: 'Ongoing by project stage',
  },
  {
    title: 'Facility Management',
    description: 'Reliable operations, upkeep and safety coordination for occupied facilities.',
    href: '/facility-management.html',
    image: '/images/facility-management.jpg',
    benefits: ['Safer daily operations', 'Preventive maintenance', 'Accountable vendor support'],
    process: 'Audit → Mobilise → Operate → Improve',
    timeline: 'Mobilisation after assessment',
  },
];

export default function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="scroll-mt-20 bg-slate-50 py-16 md:py-24" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-crimson">End-to-End Support</p>
          <h1 id="services-heading" className="text-4xl font-bold text-navy md:text-5xl">
            Services Built Around Every Stage of Redevelopment
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg">
            Explore the outcomes, working process and indicative engagement timeline for each specialist service.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-2">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={reduceMotion ? undefined : { y: -8 }}
              className="group overflow-hidden border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="grid h-full sm:grid-cols-[42%_58%]">
                <div className="relative min-h-56 overflow-hidden sm:min-h-full">
                  <motion.img
                    src={service.image}
                    alt={`${service.title} service`}
                    loading={index < 2 ? 'eager' : 'lazy'}
                    fetchPriority={index < 2 ? 'high' : 'auto'}
                    decoding="async"
                    width="720"
                    height="900"
                    whileHover={reduceMotion ? undefined : { scale: 1.07 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent" aria-hidden="true" />
                  <span className="absolute bottom-4 left-4 rounded-sm bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-navy">
                    SRA Specialist Service
                  </span>
                </div>

                <div className="flex flex-col p-6 md:p-7">
                  <h2 className="text-2xl font-bold text-navy">{service.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>

                  <div className="mt-5">
                    <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-navy">Key Benefits</h3>
                    <ul className="mt-3 grid gap-2">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-crimson/10 text-crimson">
                            <Check size={11} strokeWidth={3} aria-hidden="true" />
                          </span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <dl className="mt-5 space-y-3 border-y border-slate-100 py-4">
                    <div className="flex items-start gap-3">
                      <Route size={17} className="mt-0.5 shrink-0 text-crimson" aria-hidden="true" />
                      <div>
                        <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Our Process</dt>
                        <dd className="mt-1 text-xs font-semibold text-navy">{service.process}</dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock3 size={17} className="mt-0.5 shrink-0 text-crimson" aria-hidden="true" />
                      <div>
                        <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Indicative Timeline</dt>
                        <dd className="mt-1 text-xs font-semibold text-navy">{service.timeline}</dd>
                      </div>
                    </div>
                  </dl>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                    <motion.a
                      href={service.href}
                      whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                      className="inline-flex items-center gap-2 bg-navy px-4 py-2.5 text-xs font-bold text-white transition hover:bg-crimson"
                      aria-label={`Read more about ${service.title}`}
                    >
                      Read More
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </motion.a>
                    <a href="#faq" className="text-xs font-bold text-navy underline decoration-slate-300 underline-offset-4 transition hover:text-crimson">
                      View FAQs
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-7 text-center text-xs leading-5 text-slate-500">
          Timelines are indicative and may vary with project scope, documentation readiness and statutory authority response times.
        </p>
      </div>
    </section>
  );
}
