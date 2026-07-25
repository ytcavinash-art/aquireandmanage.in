import { ArrowRight, Building2, Home, MapPin, Users } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const projects = [
  {
    client: 'Navbharat',
    title: 'SRA Redevelopment Advisory',
    scope: 'End-to-end redevelopment advisory, tenant coordination and execution support.',
    beforeImage: 'https://images.pexels.com/photos/439416/pexels-photo-439416.jpeg?auto=compress&cs=tinysrgb&w=900',
    afterImage: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=900',
    location: 'Mumbai Metropolitan Region',
    status: 'Ongoing',
  },
  {
    client: 'DRPPL',
    title: 'Stakeholder & Project Coordination',
    scope: 'Documentation, project coordination and structured stakeholder support.',
    beforeImage: 'https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=900',
    afterImage: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=900',
    location: 'Mumbai',
    status: 'Ongoing',
  },
  {
    client: 'Avenue Landmark Realty',
    title: 'Redevelopment Management',
    scope: 'Planning, liaisoning and coordinated redevelopment management support.',
    beforeImage: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=900',
    afterImage: 'https://images.pexels.com/photos/439416/pexels-photo-439416.jpeg?auto=compress&cs=tinysrgb&w=900',
    location: 'Mumbai Metropolitan Region',
    status: 'Ongoing',
  },
];

export default function RecentProjects() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="recent-projects" className="scroll-mt-20 bg-white py-16 md:py-24" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-11 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-crimson">Project Showcase</p>
            <h2 id="projects-heading" className="text-4xl font-bold text-navy md:text-5xl">Recent Projects</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              A snapshot of redevelopment engagements where our teams bring clarity to coordination, compliance and execution.
            </p>
          </div>
          <a
            href="/gallery.html"
            className="group inline-flex w-fit items-center gap-2 text-sm font-bold text-navy transition hover:text-crimson"
          >
            Explore Project Gallery
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.client}
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={reduceMotion ? undefined : { y: -8 }}
              className="group overflow-hidden border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="grid h-56 grid-cols-2 gap-px bg-white">
                <figure className="relative overflow-hidden bg-slate-200">
                  <motion.img src={project.beforeImage} alt="" loading="lazy" decoding="async" whileHover={reduceMotion ? undefined : { scale: 1.09 }} transition={{ duration: 0.55 }} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <figcaption className="absolute left-3 top-3 bg-navy/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Before
                  </figcaption>
                </figure>
                <figure className="relative overflow-hidden bg-slate-200">
                  <motion.img src={project.afterImage} alt="" loading="lazy" decoding="async" whileHover={reduceMotion ? undefined : { scale: 1.09 }} transition={{ duration: 0.55 }} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <figcaption className="absolute right-3 top-3 bg-crimson/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Vision
                  </figcaption>
                </figure>
                <span className="absolute" />
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-crimson">{project.client}</p>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden="true" />
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold leading-snug text-navy">{project.title}</h3>
                <p className="mt-3 min-h-[3.75rem] text-sm leading-6 text-slate-600">{project.scope}</p>

                <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-slate-100 pt-5">
                  <div className="col-span-2 flex items-start gap-2.5">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-crimson" aria-hidden="true" />
                    <div>
                      <dt className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Location</dt>
                      <dd className="mt-0.5 text-xs font-semibold text-navy">{project.location}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Home size={16} className="mt-0.5 shrink-0 text-crimson" aria-hidden="true" />
                    <div>
                      <dt className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Units</dt>
                      <dd className="mt-0.5 text-xs font-semibold text-navy">On request</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Users size={16} className="mt-0.5 shrink-0 text-crimson" aria-hidden="true" />
                    <div>
                      <dt className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Families</dt>
                      <dd className="mt-0.5 text-xs font-semibold text-navy">On request</dd>
                    </div>
                  </div>
                </dl>

                <motion.a
                  href="/gallery.html"
                  whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 border border-navy px-4 py-3 text-xs font-bold text-navy transition hover:bg-navy hover:text-white"
                >
                  <Building2 size={15} aria-hidden="true" />
                  View Project
                </motion.a>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-6 text-center text-[11px] leading-5 text-slate-500">
          Before and vision visuals are representative. Project-specific imagery and confidential engagement metrics are shared subject to approval.
        </p>
      </div>
    </section>
  );
}
