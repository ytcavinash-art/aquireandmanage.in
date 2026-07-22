import { Building2, Clock3 } from 'lucide-react';

const projects = [
  {
    client: 'Navbharat',
    scope: 'SRA redevelopment advisory and execution support',
  },
  {
    client: 'DRPPL',
    scope: 'Project coordination, documentation, and stakeholder support',
  },
  {
    client: 'Avenue Landmark Realty',
    scope: 'Planning, liaisoning, and redevelopment management',
  },
];

export default function Contact() {
  return (
    <section id="ongoing-projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <p className="text-crimson text-sm font-semibold tracking-widest uppercase mb-3">Building the Future Together</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy mb-5">Ongoing Projects</h2>
          <p className="text-gray-500 leading-relaxed">
            We provide end-to-end advisory, coordination, and execution support for redevelopment projects, helping
            every stakeholder move forward with clarity, compliance, and confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project.client}
              className="group rounded-xl border border-slate-200 bg-gray-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-crimson/40 hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center" aria-hidden="true">
                  <Building2 size={23} className="text-white" />
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-crimson/10 px-3 py-1 text-xs font-semibold text-crimson">
                  <Clock3 size={13} aria-hidden="true" />
                  Ongoing
                </span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Client</p>
              <h3 className="text-xl font-bold text-navy mb-3">{project.client}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{project.scope}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
