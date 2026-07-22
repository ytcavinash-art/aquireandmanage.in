import { Helmet } from 'react-helmet-async';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ServiceSolutionsSlider from './components/ServiceSolutionsSlider';
import ContactModalButton from './components/ContactModalButton';

export default function FacilityManagementPage() {
  const services = [
    {
      title: 'Facility operations coordination',
      image: '/images/facility-management/facility-operations-coordination.png',
    },
    {
      title: 'Maintenance and repair support',
      image: '/images/facility-management/maintenance-repair-support.png',
    },
    {
      title: 'Vendor and manpower management',
      image: '/images/facility-management/vendor-manpower-management.png',
    },
    {
      title: 'Safety and compliance monitoring',
      image: '/images/facility-management/safety-compliance-monitoring.png',
    },
    {
      title: 'Asset & Equipment Management',
      image: '/images/facility-management/asset-equipment-management.png',
    },
    {
      title: 'Preventive & Predictive Maintenance Planning',
      image: '/images/facility-management/preventive-predictive-maintenance.png',
    },
    {
      title: 'Housekeeping & Janitorial Management',
      image: '/images/facility-management/housekeeping-janitorial-management.png',
    },
    {
      title: 'Security Services',
      image: '/images/facility-management/security-services-coordination.png',
    },
    {
      title: 'Utility & Energy Management',
      image: '/images/facility-management/utility-energy-management.png',
    },
    {
      title: 'Space Planning & Workplace Management',
      image: '/images/facility-management/space-workplace-management.png',
    },
  ];

  return (
    <div className="font-sans antialiased">
      <Helmet>
        <title>Facility Management Services | A&M Advisory</title>
        <meta name="description" content="Comprehensive facility management services for redevelopment projects in Mumbai." />
      </Helmet>

      <Nav />

      <main id="main-content" tabIndex={-1} className="pt-20">
        {/* Hero Section */}
        <section
          className="aspect-[10/3] w-full bg-navy bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/facility-management-banner.png')" }}
          aria-label="Facility Management"
        />

        <ServiceSolutionsSlider serviceName="Facility Management" services={services} />

        {/* CTA Section */}
        <section className="py-20 bg-navy text-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Optimize Your Facility Operations</h2>
            <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
              Let our facility management team handle all operational needs for your project.
            </p>
            <ContactModalButton />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
