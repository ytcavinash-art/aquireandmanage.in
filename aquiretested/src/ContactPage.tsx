import Breadcrumbs from './components/Breadcrumbs';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Nav from './components/Nav';

export default function ContactPage() {
  return (
    <div className="font-sans antialiased">
      <Nav />
      <main id="main-content" tabIndex={-1} className="pt-16">
        <div className="mx-auto max-w-7xl px-6 pt-8">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} />
        </div>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
