import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async'; // Yeh line add karein

import App from './App.tsx';
import ServicesPage from './ServicesPage.tsx';
import GalleryPage from './GalleryPage.tsx';
import BlogPage from './BlogPage.tsx';
import BlogDetails from './BlogDetails.tsx';
import BlogPostPage from './BlogPostPage.tsx';
import LeadershipProfilePage from './LeadershipProfilePage.tsx';
import AboutPage from './AboutPage.tsx';
import { blogs } from './data/blogs';
import './index.css';

const isServicesPage = window.location.pathname.endsWith('/services.html');
const isGalleryPage = window.location.pathname.endsWith('/gallery.html');
const isBlogPage = window.location.pathname.endsWith('/blog.html');
const isBlogDetailsPage = /^\/blog-.+\.html$/.test(window.location.pathname) && blogs.some((blog) => window.location.pathname === `/blog-${blog.slug}.html`);
const isBlogPostPage = /\/blog-(sra-redevelopment|community-engagement|regulatory-compliance)\.html$/.test(window.location.pathname);
const isLeadershipProfilePage = /\/leadership-(manoj-harlikar|srinivasan-mohan|mayilvanan-pandi)\.html$/.test(window.location.pathname);
const isAboutPage = /\/(about|vision|mission|leadership|core-values|goals)\.html$/.test(window.location.pathname);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* HelmetProvider se sabhi components ko wrap karein */}
    <HelmetProvider>
      {
        isServicesPage ? <ServicesPage /> :
          isGalleryPage ? <GalleryPage /> :
            isBlogPage ? <BlogPage /> :
              isBlogDetailsPage ? <BlogDetails /> :
                isBlogPostPage ? <BlogPostPage /> :
                  isLeadershipProfilePage ? <LeadershipProfilePage /> :
                    isAboutPage ? <AboutPage /> :
                      <App />
      }
    </HelmetProvider>
  </StrictMode>
);
