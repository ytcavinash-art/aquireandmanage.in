import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Nav from './components/Nav';

export default function GalleryPage() {
  return (
    <div className="font-sans antialiased">
      <Nav />
      <main id="main-content" tabIndex={-1} className="pt-16">
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
