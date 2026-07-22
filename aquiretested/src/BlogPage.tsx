import Blog from './components/Blog';
import Footer from './components/Footer';
import Nav from './components/Nav';

export default function BlogPage() {
  return (
    <div className="font-sans antialiased">
      <Nav />
      <main id="main-content" tabIndex={-1} className="pt-16">
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
