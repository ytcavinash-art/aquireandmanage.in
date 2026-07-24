import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Nav from './components/Nav';
import Hero from './components/Hero';
import OurClients from './components/OurClients';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FeedbackForm from './components/FeedbackForm';

export default function App() {
  useEffect(() => {
    fetch('https://aquiretested-2.onrender.com/api/items')
      .then((res) => {
        if (!res.ok) throw new Error('Items fetch failed');
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);

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

        <FeedbackForm />

      </main>

      <Footer />
    </div>
  );
}
