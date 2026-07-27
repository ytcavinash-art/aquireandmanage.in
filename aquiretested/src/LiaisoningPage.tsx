import Nav from './components/Nav';
import Footer from './components/Footer';
import ServiceSolutionsSlider from './components/ServiceSolutionsSlider';
import ContactModalButton from './components/ContactModalButton';

export default function LiaisoningPage() {
  const services = [
    {
      title: 'Coordinate with SRA and municipal authorities for project approvals',
      image: '/images/liaisoning/coordinate-sra-municipal-approvals-v2.jpg',
    },
    {
      title: 'Manage submission of proposals, documents, and follow-ups',
      image: '/images/liaisoning/Manage submission of proposals, documents, and follow-ups.jpg',
    },
    {
      title: 'Obtain necessary NOCs, LOI, and IOA approvals',
      image: '/images/liaisoning/Obtain necessary NOCs, LOI, and IOA approvals.jpg',
    },
    {
      title: 'Ensure compliance with applicable rules, policies, and regulations',
      image: '/images/liaisoning/Ensure compliance with applicable rules, policies, and regulations.jpg',
    },
    {
      title: 'Facilitate smooth communication between stakeholders and authorities',
      image: '/images/liaisoning/Facilitate smooth communication between stakeholders and authorities.jpg',
    },
    {
      title: 'Resolve regulatory challenges and expedite approval processes',
      image: '/images/liaisoning/Resolve regulatory challenges and expedite approval processes.jpg',
    },
    {
      title: 'Liaisoning stakeholder on ground',
      image: '/images/liaisoning/Liaisoning stakeholder on ground.jpg',
    },
    {
      title: 'Institutional & key stakeholder management',
      image: '/images/liaisoning/Institutional & key stakeholder management.jpg',
    },
    {
      title: 'Legal regulatory & compliance documentation',
      image: '/images/liaisoning/Legal regulatory & compliance documentation.jpg',
    },
    {
      title: 'Senior Advisors, Consultants & Specialist Retainers',
      image: '/images/liaisoning/Senior Advisors, Consultants & Specialist Retainers.jpg',
    },
  ];

  return (
    <div className="font-sans antialiased">
      <Nav />

      <main id="main-content" tabIndex={-1} className="pt-20">
        {/* Hero Section */}
        <section className="relative aspect-[10/3] w-full bg-navy" aria-label="Liaisoning">
          <img src="/images/liaisoning-banner.jpg" alt="" width="1920" height="576" loading="eager" fetchPriority="high" decoding="async" className="h-full w-full object-contain" />
          <a href="tel:+912245648350" aria-label="Call A&M Advisory at +91 022-45648350" title="Call +91 022-45648350" className="absolute bottom-[5%] left-[2.5%] h-[13%] w-[11%] rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" />
          <a href="mailto:info@aquireandmanage.com" aria-label="Email A&M Advisory at info@aquireandmanage.com" title="Email info@aquireandmanage.com" className="absolute bottom-[5%] left-[14%] h-[13%] w-[18%] rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" />
        </section>

        <ServiceSolutionsSlider serviceName="Liaisoning" services={services} />

        {/* CTA Section */}
        <section className="py-20 bg-navy text-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Need Expert Regulatory Navigation?</h2>
            <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
              Let our liaisoning team handle government coordination and approvals.
            </p>
            <ContactModalButton />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
