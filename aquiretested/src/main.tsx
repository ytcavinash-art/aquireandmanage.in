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
const ContactPage = lazy(() => import('./ContactPage.tsx'));

const requestedPath = window.location.pathname;
const routePath = requestedPath.replace(/\.html$/, '');
if (requestedPath !== routePath) {
  window.history.replaceState({}, '', `${routePath}${window.location.search}${window.location.hash}`);
}

const isServicesPage = routePath === '/services';
const isGalleryPage = routePath === '/gallery';
const isBlogPage = routePath === '/blog';
const isBlogDetailsPage = /^\/blog-.+$/.test(routePath) && blogs.some((blog) => routePath === `/blog-${blog.slug}`);
const isBlogPostPage = /\/blog-(sra-redevelopment|community-engagement|regulatory-compliance)$/.test(routePath);
const isLeadershipProfilePage = /\/leadership-(manoj-harlikar|srinivasan-mohan|mayilvanan-pandi)$/.test(routePath);
const isAboutPage = /\/(about|vision|mission|leadership|core-values|goals)$/.test(routePath);
const isContactPage = routePath === '/contact';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* HelmetProvider se sabhi components ko wrap karein */}
    <HelmetProvider>
      <Suspense fallback={<div className="min-h-screen bg-white" aria-label="Loading page" />}>
        {
          isContactPage ? <ContactPage /> :
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
