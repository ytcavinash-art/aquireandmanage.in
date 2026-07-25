import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async'; // Yeh line add karein

import { blogs } from './data/blogs';
import './index.css';

const App = lazy(() => import('./App.tsx'));
const ServicesPage = lazy(() => import('./ServicesPage.tsx'));
const GalleryPage = lazy(() => import('./GalleryPage.tsx'));
const BlogPage = lazy(() => import('./BlogPage.tsx'));
const BlogDetails = lazy(() => import('./BlogDetails.tsx'));
const BlogPostPage = lazy(() => import('./BlogPostPage.tsx'));
const LeadershipProfilePage = lazy(() => import('./LeadershipProfilePage.tsx'));
const AboutPage = lazy(() => import('./AboutPage.tsx'));

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
      <Suspense fallback={<div className="min-h-screen bg-white" aria-label="Loading page" />}>
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
      </Suspense>
    </HelmetProvider>
  </StrictMode>
);
