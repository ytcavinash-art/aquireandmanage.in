import { Award, Briefcase, Linkedin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import manojPhoto from '../assets/manoj-harlikar.jpg';
import srinivasanPhoto from '../assets/srinivasan-mohan.jpg';
import mayilvananPhoto from '../assets/mayilvanan-pandi.jpg';

const leaders = [
  {
    name: 'Dr. Manoj Harlikar',
    title: 'Chief Executive Officer',
    experience: '26+ Years',
    photo: manojPhoto,
    profile: '/leadership-manoj-harlikar.html',
    linkedin: 'https://in.linkedin.com/in/dr-manoj-harlikar-76b01a10',
    expertise: 'Tenant Management & Ground Operations',
    focalPoint: '50% 28%',
    achievements: [
      'Led high-volume redevelopment ground operations',
      'Planned survey execution for approximately 1.25 lakh hutments',
    ],
  },
  {
    name: 'Srinivasan Mohan',
    title: 'Chief Operating Officer',
    experience: '30+ Years',
    photo: srinivasanPhoto,
    profile: '/leadership-srinivasan-mohan.html',
    linkedin: 'https://in.linkedin.com/in/srinivasan-mohan-a9595737',
    expertise: 'Urban Redevelopment & Stakeholder Leadership',
    focalPoint: '50% 28%',
    achievements: [
      '12+ years leading large-scale SRA redevelopment work',
      'Experience spanning banking, real estate and rehabilitation',
    ],
  },
  {
    name: 'Mayilvanan Pandi',
    title: 'HOD – Annexure',
    experience: '29+ Years',
    photo: mayilvananPhoto,
    profile: '/leadership-mayilvanan-pandi.html',
    linkedin: 'https://in.linkedin.com/in/mayilvanan-pandi-28060a2a3',
    expertise: 'Annexure II & Rehabilitation Operations',
    focalPoint: '50% 22%',
    achievements: [
      '15.6+ years of Annexure II department experience',
      'Specialist in documentation and compliance coordination',
    ],
  },
];

export default function Leadership() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="leadership" className="scroll-mt-20 bg-slate-50 py-16 md:py-24" aria-labelledby="leadership-heading">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-crimson">The People Behind A&amp;M</p>
          <h1 id="leadership-heading" className="text-4xl font-bold text-navy md:text-5xl">Leadership Built on Experience</h1>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            Senior professionals bringing decades of cross-sector leadership to complex urban redevelopment.
          </p>
        </div>

        <div className="grid items-stretch gap-8 md:grid-cols-3">
          {leaders.map((leader, index) => (
            <motion.article
              key={leader.name}
              role="link"
              tabIndex={0}
              aria-label={`View full profile of ${leader.name}`}
              onClick={(event) => {
                if (!(event.target as HTMLElement).closest('a')) window.location.href = leader.profile;
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') window.location.href = leader.profile;
              }}
              initial={reduceMotion ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              whileHover={reduceMotion ? undefined : { y: -10 }}
              whileTap={reduceMotion ? undefined : { scale: 0.99 }}
              className="group flex h-full cursor-pointer flex-col overflow-hidden border border-slate-200 bg-white shadow-sm transition-shadow duration-500 hover:border-crimson/30 hover:shadow-2xl focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-crimson"
            >
              <div
                className="relative shrink-0 overflow-hidden bg-navy"
                style={{ height: '320px', minHeight: '320px', maxHeight: '320px' }}
              >
                <motion.img
                  src={leader.photo}
                  alt={leader.name}
                  loading="lazy"
                  decoding="async"
                  width="420"
                  height="320"
                  whileHover={reduceMotion ? undefined : { scale: 1.06 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{
                    width: '100%',
                    height: '320px',
                    display: 'block',
                    objectFit: 'cover',
                    objectPosition: leader.focalPoint,
                  }}
                  className="transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/5 to-transparent transition duration-500 group-hover:via-navy-dark/25" aria-hidden="true" />

                <span className="absolute left-5 top-5 inline-flex items-center gap-2 bg-white/95 px-3 py-2 text-[11px] font-bold text-navy shadow-lg backdrop-blur-sm">
                  <Briefcase size={14} className="text-crimson" aria-hidden="true" />
                  {leader.experience} Experience
                </span>

                <div className="absolute inset-x-0 bottom-0 min-h-[5.75rem] translate-y-2 px-6 pb-5 pt-4 text-white transition-transform duration-500 group-hover:translate-y-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#ff6985]">Area of Expertise</p>
                  <p className="mt-2 line-clamp-2 min-h-10 text-sm font-semibold leading-5">{leader.expertise}</p>
                </div>
              </div>

              <div className="grid min-h-[18rem] flex-1 grid-rows-[5rem_1fr] p-6">
                <div className="flex min-w-0 items-start justify-between gap-4">
                  <div>
                    <h2 className="line-clamp-1 text-xl font-bold text-navy">{leader.name}</h2>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-crimson">{leader.title}</p>
                  </div>
                  <a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${leader.name} on LinkedIn`}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0a66c2] text-white transition duration-300 hover:-translate-y-1 hover:bg-navy focus-visible:outline-[#0a66c2]"
                  >
                    <Linkedin size={18} fill="currentColor" aria-hidden="true" />
                  </a>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    <Award size={15} className="text-crimson" aria-hidden="true" />
                    Career Highlights
                  </p>
                  <ul className="mt-4 space-y-3">
                    {leader.achievements.map((achievement) => (
                      <li key={achievement} className="flex items-start gap-2.5 text-sm leading-5 text-slate-600">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" aria-hidden="true" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
