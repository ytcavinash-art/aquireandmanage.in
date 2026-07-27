import Nav from './components/Nav';
import Footer from './components/Footer';
import ServiceSolutionsSlider from './components/ServiceSolutionsSlider';
import ContactModalButton from './components/ContactModalButton';

export default function TenantManagementPage() {
  const services = [
    {
      title: 'Identify local Facilitators and Supporters',
      image: '/images/tenant-management/Identify local Facilitators and Supporters.jpg',
    },
    {
      title: 'Conduct society meetings on ground for max participation',
      image: '/images/tenant-management/Conduct society meetings on ground for max participation.jpg',
    },
    {
      title: 'Survey (Lane Raccee, Numbering, Lidar & Base Map)',
      image: '/images/tenant-management/Survey (Lane Raccee, Numbering, Lidar & Base Map).jpg',
    },
    {
      title: 'Documentation, Eligibility and application support',
      image: '/images/tenant-management/Documentation, Eligibility and application support.jpg',
    },
    {
      title: 'Data analysis & report generations',
      image: '/images/tenant-management/data-analysis-report-generation-v2.jpg',
    },
    {
      title: 'Nuisance Control / Vulnerable household / special-case support',
      image: '/images/tenant-management/Nuisance Control  Vulnerable household  special-case support.jpg',
    },
    {
      title: 'Individual Agreements',
      image: '/images/tenant-management/Individual Agreements.jpg',
    },
    {
      title: 'Rent readiness / bank / KYC support',
      image: '/images/tenant-management/Rent readiness  bank  KYC support.jpg',
    },
    {
      title: 'Shifting readiness and family coordination / Evacuation',
      image: '/images/tenant-management/Shifting readiness and family coordination  Evacuation.jpg',
    },
    {
      title: 'Post closure Demolition & fencing',
      image: '/images/tenant-management/Post closure Demolition & fencing.jpg',
    },
  ];

  return (
    <div className="font-sans antialiased">
      <Nav />

      <main id="main-content" tabIndex={-1} className="pt-20">
        {/* Hero Section */}
        <section className="relative aspect-[10/3] w-full bg-navy" aria-label="Tenant Management">
          <img src="/images/tenant-management-banner.jpg" alt="" width="1920" height="576" loading="eager" fetchPriority="high" decoding="async" className="h-full w-full object-contain" />
          <a href="tel:+912245648350" aria-label="Call A&M Advisory at +91 022-45648350" title="Call +91 022-45648350" className="absolute bottom-[5%] left-[2.5%] h-[13%] w-[11%] rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" />
          <a href="mailto:info@aquireandmanage.com" aria-label="Email A&M Advisory at info@aquireandmanage.com" title="Email info@aquireandmanage.com" className="absolute bottom-[5%] left-[14%] h-[13%] w-[18%] rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" />
        </section>

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
