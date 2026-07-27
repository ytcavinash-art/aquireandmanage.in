import { Helmet } from 'react-helmet-async';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ServiceSolutionsSlider from './components/ServiceSolutionsSlider';
import ContactModalButton from './components/ContactModalButton';

export default function IECActivitiesPage() {
  const services = [
    {
      title: 'Zone launch and mobilisation events',
      image: '/images/iec-activities/Zone launch and mobilisation events.jpg',
    },
    {
      title: 'Monthly community town halls',
      image: '/images/iec-activities/Monthly community town halls.jpg',
    },
    {
      title: 'Lane / chawl / society micro-meetings',
      image: '/images/iec-activities/Lane  chawl  society micro-meetings.jpg',
    },
    {
      title: 'Policy / legal / technical briefing support',
      image: '/images/iec-activities/Policy  legal  technical briefing support.jpg',
    },
    {
      title: 'Printed IEC materials',
      image: '/images/iec-activities/Printed IEC materials.jpg',
    },
    {
      title: 'Digital / WhatsApp / SMS / IVR communication',
      image: '/images/iec-activities/Digital  WhatsApp  SMS  IVR communication.jpg',
    },
    {
      title: 'Audio-visual and explainer content',
      image: '/images/iec-activities/Audio-visual and explainer content.jpg',
    },
    {
      title: 'Grievance redressal camps',
      image: '/images/iec-activities/Grievance redressal camps.jpg',
    },
    {
      title: 'Media monitoring and misinformation response',
      image: '/images/iec-activities/Media monitoring and misinformation response.jpg',
    },
    {
      title: 'Awareness Campaign',
      image: '/images/iec-activities/Awareness Campaign.jpg',
    },
  ];

  return (
    <div className="font-sans antialiased">
      <Helmet>
        <title>IEC Activities | A&M Advisory</title>
        <meta name="description" content="Information, Education and Communication (IEC) activities for stakeholder engagement in SRA redevelopment projects." />
      </Helmet>

      <Nav />

      <main id="main-content" tabIndex={-1} className="pt-20">
        {/* Hero Section */}
        <section className="aspect-[10/3] w-full bg-white" aria-label="IEC Activities">
          <img src="/images/iec-activities-banner.jpg" alt="" width="1920" height="576" loading="eager" fetchPriority="high" decoding="async" className="h-full w-full object-contain" />
        </section>

        <ServiceSolutionsSlider serviceName="IEC Activities" services={services} />

        {/* CTA Section */}
        <section className="py-20 bg-navy text-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Build Strong Stakeholder Relationships</h2>
            <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
              Let our IEC team create effective communication strategies for your project.
            </p>
            <ContactModalButton />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
