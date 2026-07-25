import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../blogData';
import { blogs } from '../data/blogs';

const siteUrl = 'https://www.aquireandmanage.com';
const defaultImage = `${siteUrl}/android-chrome-512x512.png`;
type PageSeo = { title: string; description: string; label: string };

const pages: Record<string, PageSeo> = {
  '/': { title: 'SRA Project Consultants & Advisory in Mumbai | A&M', description: 'End-to-end SRA redevelopment advisory, tenant management, government liaisoning and project coordination services across Mumbai.', label: 'Home' },
  '/about.html': { title: 'About A&M Advisory | Mumbai SRA Consultants', description: 'Meet A&M Advisory, a specialist team supporting transparent and efficient urban redevelopment projects across Mumbai.', label: 'About Us' },
  '/services.html': { title: 'SRA Redevelopment Services in Mumbai | A&M Advisory', description: 'Explore tenant management, liaisoning, IEC activities and facility management services for Mumbai redevelopment projects.', label: 'Services' },
  '/tenant-management.html': { title: 'Tenant Management for SRA Projects | A&M Advisory', description: 'Professional surveys, documentation, consent coordination and relocation support for SRA redevelopment projects in Mumbai.', label: 'Tenant Management' },
  '/liaisoning.html': { title: 'SRA Liaisoning & Government Approvals | A&M Advisory', description: 'Specialist liaisoning, statutory submission and government approval coordination for Mumbai redevelopment projects.', label: 'Liaisoning' },
  '/iec-activities.html': { title: 'IEC & Community Engagement Services | A&M Advisory', description: 'Structured information, education and communication activities that build stakeholder trust in redevelopment projects.', label: 'IEC Activities' },
  '/facility-management.html': { title: 'Facility Management for Redevelopment Projects | A&M', description: 'Reliable operations, maintenance, safety and vendor coordination for occupied redevelopment facilities in Mumbai.', label: 'Facility Management' },
  '/gallery.html': { title: 'Mumbai Redevelopment Project Gallery | A&M Advisory', description: 'View redevelopment, construction progress, before-and-after and project imagery from A&M Advisory.', label: 'Gallery' },
  '/blog.html': { title: 'SRA Redevelopment Insights & Blog | A&M Advisory', description: 'Practical insights on Mumbai SRA redevelopment, stakeholder engagement, approvals and regulatory compliance.', label: 'Blog' },
  '/news.html': { title: 'Mumbai SRA & Redevelopment News | A&M Advisory', description: 'Latest Mumbai SRA, real estate, rehabilitation and redevelopment news and updates.', label: 'News' },
  '/leadership.html': { title: 'Leadership Team | A&M Advisory', description: 'Meet the experienced professionals leading A&M Advisory and complex urban redevelopment engagements.', label: 'Leadership' },
  '/vision.html': { title: 'Our Vision | A&M Advisory', description: 'Our vision for transparent, people-first and efficient urban redevelopment in Mumbai.', label: 'Vision' },
  '/mission.html': { title: 'Our Mission | A&M Advisory', description: 'Discover A&M Advisory’s mission to improve coordination, trust and delivery across redevelopment projects.', label: 'Mission' },
  '/core-values.html': { title: 'Core Values | A&M Advisory', description: 'The accountability, transparency and stakeholder-first values that guide A&M Advisory.', label: 'Core Values' },
  '/goals.html': { title: 'Our Goals | A&M Advisory', description: 'The goals shaping A&M Advisory’s approach to sustainable and successful redevelopment.', label: 'Goals' },
  '/careers.html': { title: 'Careers at A&M Advisory | Mumbai', description: 'Explore career opportunities in liaisoning, tenant management, facility management and project coordination.', label: 'Careers' },
  '/leadership-manoj-harlikar.html': { title: 'Dr. Manoj Harlikar | A&M Advisory', description: 'View Dr. Manoj Harlikar’s leadership profile, experience and redevelopment career highlights.', label: 'Dr. Manoj Harlikar' },
  '/leadership-srinivasan-mohan.html': { title: 'Srinivasan Mohan | A&M Advisory', description: 'View Srinivasan Mohan’s leadership profile, experience and redevelopment career highlights.', label: 'Srinivasan Mohan' },
  '/leadership-mayilvanan-pandi.html': { title: 'Mayilvanan Pandi | A&M Advisory', description: 'View Mayilvanan Pandi’s leadership profile, experience and Annexure II career highlights.', label: 'Mayilvanan Pandi' },
};

export default function Seo() {
  const rawPath = window.location.pathname.replace(/\/+/g, '/');
  const cleanPath = rawPath === '/index.html' ? '/' : rawPath.replace(/\.html$/, '');
  const path = cleanPath === '/' ? '/' : `${cleanPath}.html`;
  const slug = cleanPath.match(/^\/blog-(.+)$/)?.[1];
  const article = blogPosts.find((post) => post.slug === slug);
  const apiArticle = blogs.find((post) => post.slug === slug);
  const isArticle = Boolean(article || apiArticle);
  const page = article
    ? { title: article.seoTitle, description: article.intro, label: article.title }
    : apiArticle
      ? { title: `${apiArticle.title} | A&M Advisory`, description: apiArticle.description, label: apiArticle.title }
      : pages[path] ?? pages['/'];
  const canonical = `${siteUrl}${cleanPath === '/' ? '/' : cleanPath}`;
  const breadcrumbItems = cleanPath === '/' ? [] : [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
    ...(isArticle ? [{ '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` }] : []),
    { '@type': 'ListItem', position: isArticle ? 3 : 2, name: page.label, item: canonical },
  ];
  const organization = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    '@id': `${siteUrl}/#organization`,
    name: 'A&M Advisory', url: siteUrl, logo: defaultImage, telephone: '+91-22-4564-8350',
    email: 'info@aquireandmanage.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    areaServed: { '@type': 'City', name: 'Mumbai' },
    knowsAbout: ['SRA Redevelopment', 'Tenant Management', 'Government Liaisoning', 'Slum Rehabilitation'],
  };
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'A&M Advisory',
    publisher: { '@id': `${siteUrl}/#organization` },
    inLanguage: 'en-IN',
  };
  const contentSchema = {
    '@context': 'https://schema.org', '@type': isArticle ? 'Article' : 'WebPage',
    headline: page.title, name: page.label, description: page.description, url: canonical,
    ...(isArticle && { author: { '@type': 'Organization', name: apiArticle?.author || 'A&M Advisory' }, publisher: { '@id': `${siteUrl}/#organization` }, mainEntityOfPage: canonical, articleSection: article?.category || apiArticle?.category }),
  };

  return (
    <Helmet>
      <html lang="en-IN" />
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content={isArticle ? 'article' : 'website'} />
      <meta property="og:site_name" content="A&M Advisory" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:image:alt" content="A&M Advisory" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content={defaultImage} />
      <script type="application/ld+json">{JSON.stringify(organization)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(contentSchema)}</script>
      {breadcrumbItems.length > 0 && <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbItems })}</script>}
    </Helmet>
  );
}
