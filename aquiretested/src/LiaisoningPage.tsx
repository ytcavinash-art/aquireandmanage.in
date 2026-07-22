import { Helmet } from 'react-helmet-async';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ServiceSolutionsSlider from './components/ServiceSolutionsSlider';
import ContactModalButton from './components/ContactModalButton';

export default function LiaisoningPage() {
  const services = [
    {
      title: 'Coordinate with SRA and municipal authorities for project approvals',
      image: '/images/liaisoning/Coordinate with SRA and municipal authorities for project approvals.png',
    },
    {
      title: 'Manage submission of proposals, documents, and follow-ups',
      image: '/images/liaisoning/Manage submission of proposals, documents, and follow-ups.png',
    },
    {
      title: 'Obtain necessary NOCs, LOI, and IOA approvals',
      image: '/images/liaisoning/Obtain necessary NOCs, LOI, and IOA approvals.png',
    },
    {
      title: 'Ensure compliance with applicable rules, policies, and regulations',
      image: '/images/liaisoning/Ensure compliance with applicable rules, policies, and regulations.png',
    },
    {
      title: 'Facilitate smooth communication between stakeholders and authorities',
      image: '/images/liaisoning/Facilitate smooth communication between stakeholders and authorities.png',
    },
    {
      title: 'Resolve regulatory challenges and expedite approval processes',
      image: '/images/liaisoning/Resolve regulatory challenges and expedite approval processes.png',
    },
    {
      title: 'Liaisoning stakeholder on ground',
      image: '/images/liaisoning/Liaisoning stakeholder on ground.png',
    },
    {
      title: 'Institutional & key stakeholder management',
      image: '/images/liaisoning/Institutional & key stakeholder management.png',
    },
    {
      title: 'Legal regulatory & compliance documentation',
      image: '/images/liaisoning/Legal regulatory & compliance documentation.png',
    },
    {
      title: 'Senior Advisors, Consultants & Specialist Retainers',
      image: '/images/liaisoning/Senior Advisors, Consultants & Specialist Retainers.png',
    },
  ];

  return (
    <div className="font-sans antialiased">
      <Helmet>
        <title>Liaisoning Services | A&M Advisory</title>
        <meta name="description" content="Expert liaisoning and regulatory approval services for SRA redevelopment projects in Mumbai." />
      </Helmet>

      <Nav />

      <main id="main-content" tabIndex={-1} className="pt-20">
        {/* Hero Section */}
        <section
          className="aspect-[10/3] w-full bg-navy bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/liaisoning-banner.png')" }}
          aria-label="Liaisoning"
        />

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
