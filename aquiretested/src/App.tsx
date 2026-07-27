import Nav from './components/Nav';
import Hero from './components/Hero';
import OurClients from './components/OurClients';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FeedbackForm from './components/FeedbackForm';
import ReviewsList from './components/ReviewsList';
import RecentProjects from './components/RecentProjects';
import MumbaiProjectMap from './components/MumbaiProjectMap';
import ProcessTimeline from './components/ProcessTimeline';
import ContactSection from './components/ContactSection';

export default function App() {
  return (
    <div className="font-sans antialiased">
      <Nav />

      <main id="main-content" tabIndex={-1}>
        <Hero />

        <RecentProjects />

        <MumbaiProjectMap />

        <ProcessTimeline />

        <OurClients />

        <FAQ />

        <ReviewsList />

        <FeedbackForm />

        <ContactSection />

      </main>

      <Footer />
    </div>
  );
}
