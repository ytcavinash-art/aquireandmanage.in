import { Helmet } from 'react-helmet-async';
import Nav from './components/Nav';
import Hero from './components/Hero';
import OurClients from './components/OurClients';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="font-sans antialiased">
      {/* SEO Tags for Home Page */}
      <Helmet>
        <title>SRA Project Consultants & Advisory in Mumbai | A&M</title>
        <meta 
          name="description" 
          content="A&M provides end-to-end advisory and execution support for Slum Rehabilitation (SRA) projects in Mumbai, ensuring compliance, transparency, and efficiency." 
        />
        <meta 
          name="keywords" 
          content="SRA project consultants Mumbai, Slum rehabilitation advisory, SRA execution support, A&M Advisory, redevelopment consultants Mumbai" 
        />
      </Helmet>

      <Nav />

      <main id="main-content" tabIndex={-1}>
        <Hero />

        <OurClients />

        <FAQ />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
