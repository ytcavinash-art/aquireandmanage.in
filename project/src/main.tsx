import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async'; // Yeh line add karein

import App from './App.tsx';
import ServicesPage from './ServicesPage.tsx';
import GalleryPage from './GalleryPage.tsx';
import BlogPage from './BlogPage.tsx';
import BlogPostPage from './BlogPostPage.tsx';
import LeadershipProfilePage from './LeadershipProfilePage.tsx';
import AboutPage from './AboutPage.tsx';
import ChatAssistant from './components/ChatAssistant.tsx';
import './index.css';

const isServicesPage = window.location.pathname.endsWith('/services.html');
const isGalleryPage = window.location.pathname.endsWith('/gallery.html');
const isBlogPage = window.location.pathname.endsWith('/blog.html');
const isBlogPostPage = /\/blog-(sra-redevelopment|community-engagement|regulatory-compliance)\.html$/.test(window.location.pathname);
const isLeadershipProfilePage = /\/leadership-(manoj-harlikar|srinivasan-mohan|mayilvanan-pandi)\.html$/.test(window.location.pathname);
const isAboutPage = /\/(about|vision|mission|leadership|core-values|goals)\.html$/.test(window.location.pathname);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* HelmetProvider se sabhi components ko wrap karein */}
    <HelmetProvider>
      <>
        {
          isServicesPage ? <ServicesPage /> : 
          isGalleryPage ? <GalleryPage /> : 
          isBlogPage ? <BlogPage /> : 
          isBlogPostPage ? <BlogPostPage /> : 
          isLeadershipProfilePage ? <LeadershipProfilePage /> : 
          isAboutPage ? <AboutPage /> : 
          <App />
        }
        <ChatAssistant />
      </>
    </HelmetProvider>
  </StrictMode>
);
