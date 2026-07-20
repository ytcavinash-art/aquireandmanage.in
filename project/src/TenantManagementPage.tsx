import { Helmet } from 'react-helmet-async';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ServiceSolutionsSlider from './components/ServiceSolutionsSlider';
import ContactModalButton from './components/ContactModalButton';

export default function TenantManagementPage() {
  const services = [
    {
      title: 'Identify local Facilitators and Supporters',
      image: '/images/tenant-management/Identify local Facilitators and Supporters.png',
    },
    {
      title: 'Conduct society meetings on ground for max participation',
      image: '/images/tenant-management/Conduct society meetings on ground for max participation.png',
    },
    {
      title: 'Survey (Lane Raccee, Numbering, Lidar & Base Map)',
      image: '/images/tenant-management/Survey (Lane Raccee, Numbering, Lidar & Base Map).png',
    },
    {
      title: 'Documentation, Eligibility and application support',
      image: '/images/tenant-management/Documentation, Eligibility and application support.png',
    },
    {
      title: 'Data analysis & report generations',
      image: '/images/tenant-management/Data analysis & report generations.png',
    },
    {
      title: 'Nuisance Control / Vulnerable household / special-case support',
      image: '/images/tenant-management/Nuisance Control  Vulnerable household  special-case support.png',
    },
    {
      title: 'Individual Agreements',
      image: '/images/tenant-management/Individual Agreements.png',
    },
    {
      title: 'Rent readiness / bank / KYC support',
      image: '/images/tenant-management/Rent readiness  bank  KYC support.png',
    },
    {
      title: 'Shifting readiness and family coordination / Evacuation',
      image: '/images/tenant-management/Shifting readiness and family coordination  Evacuation.png',
    },
    {
      title: 'Post closure Demolition & fencing',
      image: '/images/tenant-management/Post closure Demolition & fencing.png',
    },
  ];

  return (
    <div className="font-sans antialiased">
      <Helmet>
        <title>Tenant Management Services | A&M Advisory</title>
        <meta name="description" content="Professional tenant management and coordination services for SRA redevelopment projects in Mumbai." />
      </Helmet>

      <Nav />

      <main id="main-content" tabIndex={-1} className="pt-20">
        {/* Hero Section */}
        <section
          className="aspect-[10/3] w-full bg-navy bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/tenant-management-banner.png')" }}
          aria-label="Tenant Management"
        />

        <ServiceSolutionsSlider serviceName="Tenant Management" services={services} />

        {/* CTA Section */}
        <section className="py-20 bg-navy text-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Streamline Your Tenant Management?</h2>
            <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
              Let our experienced team handle all aspects of tenant coordination and support.
            </p>
            <ContactModalButton />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
