import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// ES module replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const siteUrl = 'https://www.aquireandmanage.com';

const seoPages: Record<string, { title: string; description: string; label: string; type?: 'article' }> = {
  'index.html': { title: 'SRA Redevelopment Consultants in Mumbai | A&M Advisory', description: 'A&M Advisory provides SRA redevelopment consultancy, tenant management, project management, liaisoning and redevelopment advisory services in Mumbai.', label: 'Home' },
  'about.html': { title: 'About A&M Advisory | Mumbai SRA Consultants', description: 'Learn about A&M Advisory and our specialist approach to transparent, efficient and people-first urban redevelopment in Mumbai.', label: 'About Us' },
  'services.html': { title: 'SRA Redevelopment Services in Mumbai | A&M Advisory', description: 'Explore tenant management, liaisoning, IEC activities and facility management services for Mumbai SRA redevelopment projects.', label: 'Services' },
  'tenant-management.html': { title: 'Tenant Management for SRA Projects | A&M Advisory', description: 'Professional surveys, documentation, consent coordination and relocation support for SRA redevelopment projects in Mumbai.', label: 'Tenant Management' },
  'liaisoning.html': { title: 'SRA Liaisoning & Government Approvals | A&M Advisory', description: 'Specialist liaisoning, statutory submissions and government approval coordination for redevelopment projects in Mumbai.', label: 'Liaisoning' },
  'iec-activities.html': { title: 'IEC & Community Engagement Services | A&M Advisory', description: 'Information, education and communication activities that improve awareness and stakeholder trust in redevelopment projects.', label: 'IEC Activities' },
  'facility-management.html': { title: 'Facility Management for Redevelopment Projects | A&M', description: 'Reliable facility operations, maintenance, safety and vendor coordination for occupied redevelopment properties in Mumbai.', label: 'Facility Management' },
  'gallery.html': { title: 'Mumbai Redevelopment Project Gallery | A&M Advisory', description: 'Explore redevelopment projects, construction progress, before-and-after views, videos and project imagery from A&M Advisory.', label: 'Gallery' },
  'blog.html': { title: 'SRA Redevelopment Insights & Blog | A&M Advisory', description: 'Read practical insights about Mumbai SRA redevelopment, tenant engagement, approvals and regulatory compliance.', label: 'Blog' },
  'news.html': { title: 'Mumbai SRA & Redevelopment News | A&M Advisory', description: 'Read the latest Mumbai SRA, real estate, rehabilitation and redevelopment news and updates.', label: 'News' },
  'leadership.html': { title: 'Leadership Team | A&M Advisory', description: 'Meet the experienced professionals leading A&M Advisory and complex urban redevelopment engagements in Mumbai.', label: 'Leadership' },
  'vision.html': { title: 'Our Vision | A&M Advisory', description: 'Discover A&M Advisory’s vision for transparent, people-first and efficient urban redevelopment.', label: 'Vision' },
  'mission.html': { title: 'Our Mission | A&M Advisory', description: 'Discover our mission to improve coordination, accountability and delivery across Mumbai redevelopment projects.', label: 'Mission' },
  'core-values.html': { title: 'Core Values | A&M Advisory', description: 'Explore the accountability, transparency and stakeholder-first values that guide A&M Advisory.', label: 'Core Values' },
  'goals.html': { title: 'Our Goals | A&M Advisory', description: 'Learn about the goals shaping A&M Advisory’s approach to sustainable and successful redevelopment.', label: 'Goals' },
  'careers.html': { title: 'Careers at A&M Advisory | Mumbai', description: 'Explore career opportunities in liaisoning, tenant management, facility management and redevelopment project coordination.', label: 'Careers' },
  'contact.html': { title: 'Contact A&M Advisory | Mumbai SRA Consultants', description: 'Contact A&M Advisory in Mumbai for SRA redevelopment consultancy, tenant management, liaisoning and project coordination support.', label: 'Contact Us' },
  'leadership-manoj-harlikar.html': { title: 'Dr. Manoj Harlikar | A&M Advisory', description: 'View Dr. Manoj Harlikar’s leadership profile, experience and redevelopment career highlights.', label: 'Dr. Manoj Harlikar' },
  'leadership-srinivasan-mohan.html': { title: 'Srinivasan Mohan | A&M Advisory', description: 'View Srinivasan Mohan’s leadership profile, experience and redevelopment career highlights.', label: 'Srinivasan Mohan' },
  'leadership-mayilvanan-pandi.html': { title: 'Mayilvanan Pandi | A&M Advisory', description: 'View Mayilvanan Pandi’s leadership profile, experience and Annexure II career highlights.', label: 'Mayilvanan Pandi' },
  'blog-sra-redevelopment.html': { title: 'Successful SRA Redevelopment Planning | A&M Advisory', description: 'Learn how planning, regulatory coordination and stakeholder management support successful SRA redevelopment projects.', label: 'Successful SRA Redevelopment', type: 'article' },
  'blog-community-engagement.html': { title: 'Community Engagement in Redevelopment | A&M Advisory', description: 'Learn why transparent communication and stakeholder engagement are essential for successful redevelopment projects.', label: 'Community Engagement', type: 'article' },
  'blog-regulatory-compliance.html': { title: 'Regulatory Compliance for Redevelopment | A&M Advisory', description: 'Understand how proactive compliance, liaisoning and approval tracking maintain redevelopment project momentum.', label: 'Regulatory Compliance', type: 'article' },
};

const staticSeoPlugin = {
  name: 'a-and-m-static-seo',
  transformIndexHtml(html: string, context: { filename: string }) {
    const file = basename(context.filename);
    const page = seoPages[file];
    if (!page) return html;

    const cleanPath = file === 'index.html' ? '/' : `/${file.replace(/\.html$/, '')}`;
    const canonical = `${siteUrl}${cleanPath}`;
    const image = `${siteUrl}/android-chrome-512x512.png`;
    const organization = {
      '@context': 'https://schema.org',
      '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
      '@id': `${siteUrl}/#organization`,
      name: 'A&M Advisory',
      url: siteUrl,
      logo: image,
      telephone: '+91-22-4564-8350',
      email: 'info@aquireandmanage.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressRegion: 'Maharashtra', addressCountry: 'IN' },
      areaServed: { '@type': 'City', name: 'Mumbai' },
    };
    const website = { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: siteUrl, name: 'A&M Advisory', publisher: { '@id': `${siteUrl}/#organization` }, inLanguage: 'en-IN' };
    const content = {
      '@context': 'https://schema.org',
      '@type': page.type === 'article' ? 'Article' : 'WebPage',
      name: page.label,
      headline: page.title,
      description: page.description,
      url: canonical,
      ...(page.type === 'article' && { author: { '@id': `${siteUrl}/#organization` }, publisher: { '@id': `${siteUrl}/#organization` }, mainEntityOfPage: canonical }),
    };
    const breadcrumb = cleanPath === '/' ? null : {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: page.label, item: canonical },
      ],
    };
    const tags = `
    <title>${page.title}</title>
    <meta name="description" content="${page.description}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="${page.type === 'article' ? 'article' : 'website'}" />
    <meta property="og:site_name" content="A&amp;M Advisory" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:title" content="${page.title}" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${page.title}" />
    <meta name="twitter:description" content="${page.description}" />
    <meta name="twitter:image" content="${image}" />
    <script type="application/ld+json">${JSON.stringify(organization)}</script>
    <script type="application/ld+json">${JSON.stringify(website)}</script>
    <script type="application/ld+json">${JSON.stringify(content)}</script>
    ${breadcrumb ? `<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>` : ''}`;

    const cleanedHtml = html
      .replace(/<title>[\s\S]*?<\/title>/i, '')
      .replace(/<meta\s+name=["']description["'][^>]*>/gi, '')
      .replace(/<meta\s+name=["']robots["'][^>]*>/gi, '')
      .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '')
      .replace(/<meta\s+(?:property|name)=["'](?:og:|twitter:)[^"']+["'][^>]*>/gi, '');
    return cleanedHtml.replace('</head>', `${tags}\n  </head>`);
  },
};

export default defineConfig({
  plugins: [react(), staticSeoPlugin],

  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  build: {
    target: 'es2015',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        blog: resolve(__dirname, 'blog.html'),
        news: resolve(__dirname, 'news.html'),

        blogSraRedevelopment: resolve(
          __dirname,
          'blog-sra-redevelopment.html'
        ),

        blogCommunityEngagement: resolve(
          __dirname,
          'blog-community-engagement.html'
        ),

        blogRegulatoryCompliance: resolve(
          __dirname,
          'blog-regulatory-compliance.html'
        ),

        leadershipManojHarlikar: resolve(
          __dirname,
          'leadership-manoj-harlikar.html'
        ),

        leadershipSrinivasanMohan: resolve(
          __dirname,
          'leadership-srinivasan-mohan.html'
        ),

        leadershipMayilvananPandi: resolve(
          __dirname,
          'leadership-mayilvanan-pandi.html'
        ),

        about: resolve(__dirname, 'about.html'),
        vision: resolve(__dirname, 'vision.html'),
        mission: resolve(__dirname, 'mission.html'),
        leadership: resolve(__dirname, 'leadership.html'),
        coreValues: resolve(__dirname, 'core-values.html'),
        goals: resolve(__dirname, 'goals.html'),
        careers: resolve(__dirname, 'careers.html'),
        contact: resolve(__dirname, 'contact.html'),

        tenantManagement: resolve(
          __dirname,
          'tenant-management.html'
        ),

        liaisoning: resolve(__dirname, 'liaisoning.html'),

        iecActivities: resolve(
          __dirname,
          'iec-activities.html'
        ),

        facilityManagement: resolve(
          __dirname,
          'facility-management.html'
        ),
      },
    },
  },
});
