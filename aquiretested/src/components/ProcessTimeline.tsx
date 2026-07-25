import { useRef } from 'react';
import {
  Building2,
  ClipboardCheck,
  FileCheck2,
  Handshake,
  KeyRound,
  ScanSearch,
} from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We understand the site, stakeholders, objectives and key redevelopment challenges.',
    Icon: Handshake,
  },
  {
    number: '02',
    title: 'Survey',
    description: 'On-ground assessment, household mapping and project information are systematically captured.',
    Icon: ScanSearch,
  },
  {
    number: '03',
    title: 'Documentation',
    description: 'Eligibility records, applications and compliance documents are organised and verified.',
    Icon: FileCheck2,
  },
  {
    number: '04',
    title: 'Government Approval',
    description: 'Submissions, authority coordination, regulatory follow-ups and approvals are managed.',
    Icon: ClipboardCheck,
  },
  {
    number: '05',
    title: 'Construction',
    description: 'Stakeholder communication and execution coordination continue through the construction phase.',
    Icon: Building2,
  },
  {
    number: '06',
    title: 'Handover',
    description: 'Final coordination supports an organised transition and successful rehabilitation handover.',
    Icon: KeyRound,
  },
];

export default function ProcessTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(timelineRef, { once: true, amount: 0.12 });
  const reduceMotion = useReducedMotion();

  return (
    <section id="process" className="scroll-mt-20 bg-white py-16 md:py-24" aria-labelledby="process-heading">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-crimson">How We Work</p>
          <h2 id="process-heading" className="text-4xl font-bold text-navy md:text-5xl">
            From Consultation to Handover
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            A structured six-stage process that keeps people, paperwork and project progress aligned.
          </p>
        </div>

        <div ref={timelineRef} className="relative">
          <div className="absolute bottom-8 left-6 top-8 w-px bg-slate-200 md:left-1/2 md:-translate-x-1/2" aria-hidden="true">
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-crimson via-crimson to-navy"
              initial={reduceMotion ? false : { scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
          </div>

          <ol className="relative space-y-7 md:space-y-2">
            {steps.map(({ number, title, description, Icon }, index) => {
              const isRight = index % 2 !== 0;

              return (
                <motion.li
                  key={title}
                  initial={reduceMotion ? false : { opacity: 0, x: isRight ? 36 : -36 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRight ? 36 : -36 }}
                  transition={{ duration: 0.55, delay: reduceMotion ? 0 : index * 0.18 }}
                  className={`relative grid min-h-40 grid-cols-[3rem_1fr] items-center gap-5 md:grid-cols-[1fr_5rem_1fr] md:gap-7 ${
                    isRight ? 'md:text-left' : 'md:text-right'
                  }`}
                >
                  <div className={`hidden md:block ${isRight ? 'md:col-start-3' : 'md:col-start-1'}`}>
                    <article className={`group inline-block w-full max-w-md border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-crimson/30 hover:shadow-lg ${isRight ? '' : 'md:ml-auto'}`}>
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-crimson/10 text-crimson">
                          <Icon size={19} aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-crimson">Step {number}</p>
                          <h3 className="mt-1 text-xl font-bold text-navy">{title}</h3>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
                    </article>
                  </div>

                  <span className="relative z-10 col-start-1 row-start-1 grid h-12 w-12 place-items-center rounded-full border-4 border-white bg-navy text-xs font-bold text-white shadow-lg md:col-start-2">
                    {number}
                  </span>

                  <article className="col-start-2 row-start-1 border border-slate-200 bg-white p-5 shadow-sm md:hidden">
                    <div className="flex items-center gap-3">
                      <Icon size={19} className="shrink-0 text-crimson" aria-hidden="true" />
                      <h3 className="text-lg font-bold text-navy">{title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
                  </article>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
