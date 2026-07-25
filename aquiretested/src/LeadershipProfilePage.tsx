import { ArrowLeft } from 'lucide-react';
import Footer from './components/Footer';
import Nav from './components/Nav';
import manojPhoto from './assets/manoj-harlikar.jpg';
import srinivasanPhoto from './assets/srinivasan-mohan.jpg';
import mayilvananPhoto from './assets/mayilvanan-pandi.jpg';

const profiles = {
  'manoj-harlikar': {
    name: 'Dr. Manoj Harlikar', title: 'CEO', photo: manojPhoto,
    positioning: 'Industry Veteran – Tenant Management, Ground Operations & Large-Scale Redevelopment Execution',
    experience: [
      'Dr. Manoj Harlikar is a postgraduate veterinary professional with a PGDBM qualification and over 26 years of diversified industry experience across pharmaceuticals, insurance, banking, real estate, redevelopment, and large-scale ground operations.',
      'He has held key product management and leadership roles with reputed organisations such as ICICI Lombard, Aditya Birla Financial Services, ICICI Bank, and leading pharmaceutical companies, where he gained strong expertise in product strategy, stakeholder coordination, process management, and execution-driven operations.',
      'Over the years, Dr. Harlikar has developed deep specialization in tenant management, ground-level coordination, eligibility surveys, community engagement, and rehabilitation-linked project execution, especially in complex SRA and urban redevelopment projects.',
      'He has handled large-scale redevelopment assignments with reputed organisations including Omkar Realtors, Prestige Group, and Adani Group – NMDPL. His experience covers end-to-end ground operations such as tenant identification, documentation, survey planning, hutment mapping, coordination with local stakeholders, grievance handling, transit-related processes, and execution support for rehabilitation projects.',
      'One of his most significant contributions has been his role in initiating the Dharavi Redevelopment Project from scratch, where he was instrumental in planning and completing the ground survey of approximately 1.25 lakh hutments. This experience reflects his strong command over high-volume survey execution, field team management, data collection systems, local coordination, and sensitive community handling.',
      'Dr. Harlikar is widely regarded as a strong industry veteran in tenant management and ground management, with the ability to bridge the gap between developers, authorities, project teams, and affected communities. His practical understanding of redevelopment dynamics, people management, ground realities, and execution challenges makes him a valuable professional for large-scale SRA, slum rehabilitation, and urban transformation projects.',
    ],
    strengths: ['Tenant management and community coordination', 'Ground survey planning and execution', 'Large-scale SRA and redevelopment operations', 'Eligibility, documentation and hutment data management', 'Stakeholder coordination with developers, authorities and communities', 'Field team supervision and process implementation', 'Grievance handling and ground-level conflict resolution', 'Transit and rehabilitation support operations', 'High-volume project execution under complex urban conditions'],
  },
  'srinivasan-mohan': {
    name: 'Srinivasan Mohan', title: 'COO', photo: srinivasanPhoto,
    positioning: 'Experienced business leader specializing in large-scale urban redevelopment, community engagement, and sustainable project delivery in the real estate sector.',
    experience: [
      'MBA-qualified professional with over 30 years of experience across the financial services sector and Mumbai’s real estate industry, including 12+ years of leadership in large-scale Slum Rehabilitation Redevelopment Projects.',
      'Associated with HDFC Bank, Omkar Realtors & Developers, and the Adani Group (NMDPL), he has played key roles in landmark projects, including the Dharavi Redevelopment Project. His expertise spans stakeholder engagement, tenant management, land acquisition, rehabilitation, project execution, and coordination with government authorities.',
      'Known for his strong Emotional Quotient (EQ), people-centric leadership, and effective local communication, Srinivasan has consistently built trust with communities, project teams, and regulatory stakeholders. His ability to balance operational excellence with meaningful stakeholder engagement has been instrumental in delivering complex SRA redevelopment projects successfully.',
    ],
    strengths: ['Personal Banking', 'Asset Products', 'Wealth Advisory', 'SRA Redevelopment', 'Tenant Management', 'Land Acquisition', 'Rehabilitation', 'Stakeholder Management'],
  },
  'mayilvanan-pandi': {
    name: 'Mayilvanan Pandi', title: 'HOD – Annexure', photo: mayilvananPhoto,
    positioning: 'Annexure II, Rehabilitation & Project Operations',
    experience: [
      'Mr. Mayilvanan Pandi is a graduate professional with over 29 years of diverse industry experience spanning Banking, Aviation (Airlines), and Real Estate sectors. Throughout his career, he has demonstrated strong expertise in operations, administration, customer relations, and project management across multiple industries.',
      'In the Real Estate sector, he has played a significant role in the successful execution of large-scale Slum Rehabilitation Authority (SRA) projects. He served in the Real Estate sector for over 15.6 years in the Annexure II Department, where he was instrumental in managing and coordinating Annexure II documentation, stakeholder engagement, compliance processes, and rehabilitation-related activities essential for project execution.',
      'His extensive experience, commitment to excellence, and ability to work effectively with government authorities, project teams, and community stakeholders have contributed significantly to the successful delivery of complex urban redevelopment projects.',
      'With nearly three decades of professional experience, Mr. Mayilvanan Pandi continues to bring valuable industry knowledge, practical expertise, and a results-oriented approach to every assignment he undertakes.',
    ],
    strengths: ['Annexure II documentation management', 'Stakeholder engagement', 'Compliance coordination', 'Rehabilitation-related activities', 'Operations and administration', 'Customer relations'],
  },
};

export default function LeadershipProfilePage() {
  const slug = window.location.pathname.match(/leadership-(.+?)(?:\.html)?$/)?.[1] as keyof typeof profiles;
  const profile = profiles[slug] ?? profiles['manoj-harlikar'];

  return (
    <div className="font-sans antialiased">
      <Nav />
      <main id="main-content" tabIndex={-1} className="pt-16 bg-white">
        <section className="py-20 md:py-24">
          <div className="max-w-5xl mx-auto px-6">
            <a href="/leadership.html" className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-crimson mb-12">
              <ArrowLeft size={17} aria-hidden="true" /> Back to Leadership Team
            </a>
            <article className="grid gap-10 md:grid-cols-[minmax(260px,0.85fr)_1.4fr] md:gap-14">
              <div className="flex items-start justify-center md:justify-start">
                <img src={profile.photo} alt={profile.name} loading="eager" fetchPriority="high" decoding="async" width="320" height="400" className="w-full max-w-xs aspect-[4/5] object-cover rounded-lg ring-2 ring-crimson" />
              </div>
              <div>
                <p className="text-crimson text-sm font-semibold tracking-widest uppercase mb-3">Leadership Profile</p>
                <h1 className="text-4xl md:text-5xl leading-tight text-navy mb-3">{profile.name}</h1>
                <p className="text-crimson text-lg font-medium mb-8">{profile.title}</p>
                <div className="w-12 h-0.5 bg-crimson mb-8" />
                <p className="text-lg font-medium leading-relaxed text-navy mb-8">{profile.positioning}</p>
                <h2 className="text-2xl text-navy mb-4">Experience</h2>
                <div className="space-y-5 text-justify text-gray-600 leading-relaxed">
                  {profile.experience.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                <section className="mt-10">
                  <h2 className="text-2xl text-navy mb-4">Core Strengths</h2>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-gray-600">
                    {profile.strengths.map((strength) => <li key={strength} className="flex gap-2"><span className="text-crimson" aria-hidden="true">•</span>{strength}</li>)}
                  </ul>
                </section>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
