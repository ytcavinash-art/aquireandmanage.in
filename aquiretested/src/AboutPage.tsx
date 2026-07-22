import About from './components/About';
import CoreValues from './components/CoreValues';
import Footer from './components/Footer';
import Goals from './components/Goals';
import Leadership from './components/Leadership';
import Nav from './components/Nav';
import VisionMission from './components/VisionMission';

export default function AboutPage() {
  const page = window.location.pathname.replace(/^\//, '').replace('.html', '');
  const content = page === 'vision' || page === 'mission' ? <VisionMission /> : page === 'leadership' ? <Leadership /> : page === 'core-values' ? <CoreValues /> : page === 'goals' ? <Goals /> : <About />;
  return <div className="font-sans antialiased"><Nav /><main id="main-content" tabIndex={-1} className="pt-16">{content}</main><Footer /></div>;
}
