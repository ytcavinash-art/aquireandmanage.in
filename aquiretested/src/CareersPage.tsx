import { Briefcase, Clock, MapPin } from 'lucide-react';
import Footer from './components/Footer';
import Nav from './components/Nav';

const jobs = [
  {
    title: 'Business Development Executive',
    location: 'Mumbai',
    experience: '1–3 Years',
    type: 'Full Time',
    responsibilities: ['Generate new business opportunities', 'Build client relationships', 'Prepare proposals and presentations', 'Coordinate with internal teams'],
  },
  {
    title: 'Liaisoning Executive',
    location: 'Mumbai',
    experience: '2–5 Years',
    type: 'Full Time',
    responsibilities: ['Coordinate with government authorities', 'Handle approvals and documentation', 'Maintain compliance records', 'Follow up project permissions'],
  },
  {
    title: 'Facility Manager',
    location: 'Mumbai',
    experience: '3+ Years',
    type: 'Full Time',
    responsibilities: ['Manage facility operations', 'Vendor management', 'Safety compliance', 'Maintenance supervision'],
  },
  {
    title: 'Project Coordinator',
    location: 'Mumbai',
    experience: '1–3 Years',
    type: 'Full Time',
    responsibilities: ['Coordinate project schedules', 'Track project progress', 'Prepare reports', 'Communicate with stakeholders'],
  },
];

export default function CareersPage() {
  return (
    <div className="bg-white font-sans antialiased">
      <Nav />

      <main id="main-content" tabIndex={-1} className="pt-16">
        <section className="bg-navy py-24 text-white">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h1 className="mb-4 text-5xl font-bold">Current Openings</h1>
            <p className="mx-auto max-w-3xl text-slate-300">
              Join A&M and become part of a team committed to excellence in advisory, redevelopment, facility management, and liaisoning services.
            </p>
          </div>
        </section>

        <section className="py-20" aria-labelledby="open-roles-heading">
          <div className="mx-auto max-w-7xl px-6">
            <h2 id="open-roles-heading" className="sr-only">Open roles</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {jobs.map((job) => (
                <article key={job.title} className="rounded-xl border p-8 shadow-lg transition hover:shadow-xl">
                  <h2 className="mb-5 text-2xl font-bold text-navy">{job.title}</h2>
                  <div className="mb-6 space-y-2 text-slate-600">
                    <p className="flex items-center gap-2"><MapPin size={18} aria-hidden="true" />{job.location}</p>
                    <p className="flex items-center gap-2"><Briefcase size={18} aria-hidden="true" />{job.experience}</p>
                    <p className="flex items-center gap-2"><Clock size={18} aria-hidden="true" />{job.type}</p>
                  </div>
                  <h3 className="mb-3 font-semibold">Responsibilities</h3>
                  <ul className="mb-6 ml-5 list-disc space-y-2 text-slate-600">
                    {job.responsibilities.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <span className="inline-block rounded-lg bg-slate-200 px-6 py-3 font-semibold text-navy">
                    Upcoming Vacancy
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-100 py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="rounded-xl bg-white p-10 shadow-xl">
              <h2 className="mb-3 text-3xl font-bold text-navy">Didn't Find the Right Role?</h2>
              <p className="mb-8 text-slate-600">
                Email your resume to us, and we'll contact you when a suitable opportunity becomes available.
              </p>
              <a href="mailto:info@aquireandmanage.com?subject=Resume%20Submission" className="inline-block rounded-lg bg-navy px-7 py-3 font-semibold text-white transition hover:bg-[#0a1b3a]">
                Submit Your Resume
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
