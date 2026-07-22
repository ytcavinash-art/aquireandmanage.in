import { Helmet } from 'react-helmet-async';
import Nav from './components/Nav';
import Services from './components/Services';
import Footer from './components/Footer';
import ContactModalButton from './components/ContactModalButton';

export default function ServicesPage() {
  return (
    <div className="font-sans antialiased">
      {/* SEO Tags for Services Page */}
      <Helmet>
        <title>SRA Liaisoning & Facility Management Services Mumbai | A&M</title>
        <meta 
          name="description" 
          content="A&M provides expert tenant management, IEC activities, liaisoning, and facility management services for SRA redevelopment projects in Mumbai." 
        />
        <meta 
          name="keywords" 
          content="SRA liaisoning, tenant management Mumbai, facility management SRA, IEC activities slum rehabilitation" 
        />
      </Helmet>

      <Nav />
      <main id="main-content" tabIndex={-1} className="pt-16">
        <Services />
        <section className="bg-navy py-20 text-white">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="mb-5 text-3xl font-bold md:text-4xl">Ready to Move Your Redevelopment Forward?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-200">
              From tenant management and liaisoning to IEC activities and facility management, our team is ready to support your project.
            </p>
            <ContactModalButton />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
