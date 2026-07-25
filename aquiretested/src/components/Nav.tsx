import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { scrollToFooter } from '../lib/scrollToFooter';
import PageLoader from './PageLoader';
import Seo from './Seo';

const serviceLinks = [
  { label: 'Tenant Management', href: '/tenant-management.html' },
  { label: 'Liaisoning', href: '/liaisoning.html' },
  { label: 'IEC Activities', href: '/iec-activities.html' },
  { label: 'Facility Management', href: '/facility-management.html' },
];

const galleryLinks = [
  { label: 'ANJ Group of Companies', href: '/gallery.html#anj-group' },
  { label: 'Avenue Landmark Realty', href: '/gallery.html#avenue-landmark-realty' },
  { label: 'Navbharat Mega Developers', href: '/gallery.html#navbharat-mega-developers' },
  { label: 'Tata Projects', href: '/gallery.html#tata-projects' },
  { label: 'L&T Realty', href: '/gallery.html#l-and-t-realty' },
];

const searchTargets = [
  { label: 'About Us', href: '/about.html', terms: ['about', 'company', 'advisory'] },
  { label: 'Our Leadership Team', href: '/leadership.html', terms: ['leadership', 'team', 'ceo', 'coo'] },
  { label: 'Services', href: '/services.html', terms: ['services', 'all services', 'offerings'] },
  { label: 'Tenant Management', href: '/tenant-management.html', terms: ['tenant', 'management'] },
  { label: 'Liaisoning', href: '/liaisoning.html', terms: ['liaisoning', 'approvals', 'compliance'] },
  { label: 'IEC Activities', href: '/iec-activities.html', terms: ['iec', 'communication', 'activities'] },
  { label: 'Facility Management', href: '/facility-management.html', terms: ['facility', 'maintenance'] },
  { label: 'A&M Projects Gallery', href: '/gallery.html', terms: ['gallery', 'projects', 'images'] },
  { label: 'A&M Advisory Blog', href: '/blog.html', terms: ['blog', 'insights', 'articles'] },
  { label: 'SRA & Real Estate News', href: '/news.html', terms: ['news', 'sra news', 'real estate news'] },
  { label: 'Contact Us', href: '/#footer', terms: ['contact', 'phone', 'email', 'office'] },
];

export default function Nav() {
  const isInnerPage = window.location.pathname !== '/' && !window.location.pathname.endsWith('/index.html');
  const links = isInnerPage
    ? [
        { label: 'Home', href: '/#home' },
        { label: 'About', href: '/about.html' },
        { label: 'Gallery', href: '/gallery.html' },
        { label: 'News', href: '/news.html' },
        { label: 'Contact', href: '/#footer' },
      ]
    : [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '/about.html' },
        { label: 'Gallery', href: '/gallery.html' },
        { label: 'News', href: '/news.html' },
        { label: 'Contact', href: '#footer' },
      ];
  const aboutLinks = [
    { label: 'About Us', href: '/about.html' },
    { label: 'Vision & Mission', href: '/vision.html' },
    { label: 'Our Leadership Team', href: '/leadership.html' },
    { label: 'Our Core Values', href: '/core-values.html' },
    { label: 'Our Goals', href: '/goals.html' },
  ];
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLFormElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const ringLight = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy focus-visible:outline-offset-4 focus-visible:rounded-sm';

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      setAboutOpen(false);
      setServicesOpen(false);
      setGalleryOpen(false);
      setSearchExpanded(false);
      setSearchOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
      if (!aboutRef.current?.contains(event.target as Node)) setAboutOpen(false);
      if (!galleryRef.current?.contains(event.target as Node)) setGalleryOpen(false);
      if (!searchRef.current?.contains(event.target as Node)) {
        setSearchExpanded(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  useEffect(() => {
    if (open) menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
  }, [open]);

  useEffect(() => {
    if (searchExpanded) searchInputRef.current?.focus();
  }, [searchExpanded]);

  const handleHomeLink = (href: string) => {
    setOpen(false);
    document.querySelector<HTMLElement>(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    scrollToFooter();
  };

  const homeLinkProps = (href: string, label?: string) => {
    // Handle Contact links specially
    if (label === 'Contact') {
      return {
        onClick: handleContactLink,
      };
    }
    // Handle other anchor links on homepage
    return isInnerPage || !href.startsWith('#') ? {} : {
      onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        handleHomeLink(href);
      },
    };
  };

  const searchResults = searchQuery.trim()
    ? searchTargets.filter((target) => {
        const query = searchQuery.toLowerCase().trim();
        return target.label.toLowerCase().includes(query) || target.terms.some((term) => term.includes(query));
      }).slice(0, 5)
    : [];

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchResults[0]) window.location.href = searchResults[0].href;
    else setSearchOpen(true);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-slate-200">
      <Seo />
      <PageLoader />
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <a href={isInnerPage ? '/' : '#home'} {...homeLinkProps('#home')} className={`flex items-center gap-1 select-none ${ringLight}`} aria-label="A&M Advisory — go to home">
          <img src="/am-logo.png" alt="A&M Advisory" className="h-10 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-4">
        <nav aria-label="Primary navigation" className="flex items-center gap-7">
          {links.slice(0, 1).map((link) => (
            <a key={link.href} href={link.href} {...homeLinkProps(link.href, link.label)} className={`text-sm font-medium text-navy/75 hover:text-navy transition-colors ${ringLight}`}>
              {link.label}
            </a>
          ))}

          <div ref={aboutRef} className="relative" onMouseEnter={() => setAboutOpen(true)} onMouseLeave={() => setAboutOpen(false)}>
            <div className="flex items-center">
              <a href="/about.html" className={`text-sm font-medium text-navy/75 transition-colors hover:text-navy ${ringLight}`}>About</a>
              <button type="button" onClick={() => setAboutOpen((value) => !value)} className={`ml-0.5 text-navy/75 transition-colors hover:text-navy ${ringLight}`} aria-label="Open About menu" aria-expanded={aboutOpen} aria-haspopup="menu" aria-controls="about-menu">
                <ChevronDown size={16} aria-hidden="true" className={`transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {aboutOpen && (
              <div id="about-menu" role="menu" aria-label="About" className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 border border-slate-200 bg-white py-2 shadow-lg">
                {aboutLinks.map((link) => (
                  <a key={link.href} href={link.href} {...homeLinkProps(link.href, link.label)} role="menuitem" onClick={() => setAboutOpen(false)} className={`block px-5 py-3 text-sm font-medium text-navy/75 transition-colors hover:bg-slate-50 hover:text-navy ${ringLight}`}>
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div ref={servicesRef} className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <div className="flex items-center">
              <a href="/services.html" className={`text-sm font-medium text-navy/75 transition-colors hover:text-navy ${ringLight}`}>Services</a>
              <button type="button" onClick={() => setServicesOpen((value) => !value)} className={`ml-0.5 text-navy/75 transition-colors hover:text-navy ${ringLight}`} aria-label="Open Services menu" aria-expanded={servicesOpen} aria-haspopup="menu" aria-controls="services-menu">
                <ChevronDown size={16} aria-hidden="true" className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {servicesOpen && (
              <div id="services-menu" role="menu" aria-label="Services" className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 border border-slate-200 bg-white py-2 shadow-lg">
                {serviceLinks.map((service) => (
                  <a key={service.href} href={service.href} role="menuitem" className={`block px-5 py-3 text-sm font-medium text-navy/75 transition-colors hover:bg-slate-50 hover:text-navy ${ringLight}`}>
                    {service.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div ref={galleryRef} className="relative" onMouseEnter={() => setGalleryOpen(true)} onMouseLeave={() => setGalleryOpen(false)}>
            <div className="flex items-center">
              <a href="/gallery.html" className={`text-sm font-medium text-navy/75 transition-colors hover:text-navy ${ringLight}`}>Gallery</a>
              <button type="button" onClick={() => setGalleryOpen((value) => !value)} className={`ml-0.5 text-navy/75 transition-colors hover:text-navy ${ringLight}`} aria-label="Open Gallery menu" aria-expanded={galleryOpen} aria-haspopup="menu" aria-controls="gallery-menu">
                <ChevronDown size={16} aria-hidden="true" className={`transition-transform duration-200 ${galleryOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {galleryOpen && (
              <div id="gallery-menu" role="menu" aria-label="Gallery" className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 border border-slate-200 bg-white py-2 shadow-lg">
                {galleryLinks.map((link) => (
                  <a key={link.href} href={link.href} role="menuitem" onClick={() => setGalleryOpen(false)} className={`block px-5 py-3 text-sm font-medium text-navy/75 transition-colors hover:bg-slate-50 hover:text-navy ${ringLight}`}>
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {links.slice(3).map((link) => (
            <a key={link.href} href={link.href} {...homeLinkProps(link.href, link.label)} className={`text-sm font-medium text-navy/75 hover:text-navy transition-colors ${ringLight}`}>
              {link.label}
            </a>
          ))}
        </nav>
        <form ref={searchRef} onSubmit={handleSearch} className="relative" role="search">
          <label className="sr-only" htmlFor="site-search">Search the site</label>
          <div className={`flex items-center transition-all ${searchExpanded ? 'rounded-sm border border-slate-200 bg-slate-50 focus-within:border-navy' : ''}`}>
            {searchExpanded && (
              <input
                ref={searchInputRef}
                id="site-search"
                type="search"
                value={searchQuery}
                onChange={(event) => { setSearchQuery(event.target.value); setSearchOpen(true); }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Type your requirement"
                className="w-48 bg-transparent px-3 py-2 text-sm text-navy placeholder:text-slate-400 focus:outline-none lg:w-56"
              />
            )}
            <button
              type={searchExpanded ? 'submit' : 'button'}
              onClick={() => {
                if (!searchExpanded) setSearchExpanded(true);
              }}
              aria-label={searchExpanded ? 'Search' : 'Open search'}
              className={`grid h-9 w-9 place-items-center text-navy/70 transition-colors hover:text-navy ${ringLight}`}
            >
              <Search size={17} aria-hidden="true" />
            </button>
          </div>
            {searchOpen && searchQuery.trim() && (
            <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-sm border border-slate-200 bg-white py-1 shadow-lg">
              {searchResults.length ? searchResults.map((result) => (
                <a key={result.href} href={result.href} onClick={(e) => { if (result.label === 'Contact Us') handleContactLink(e); setSearchOpen(false); }} className={`block px-4 py-3 text-sm font-medium text-navy/75 hover:bg-slate-50 hover:text-navy ${ringLight}`}>
                  {result.label}
                </a>
              )) : <p className="px-4 py-3 text-sm text-slate-500">No matching pages found.</p>}
            </div>
          )}
        </form>
        </div>

        <button ref={toggleRef} className={`md:hidden text-navy ${ringLight}`} onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="Navigation menu" className="md:hidden bg-white border-t border-slate-200">
          <nav aria-label="Mobile navigation">
            {links.slice(0, 1).map((link) => (
              <a key={link.href} href={link.href} {...homeLinkProps(link.href, link.label)} className={`block px-6 py-3 text-sm font-medium text-navy/75 hover:text-navy hover:bg-slate-50 transition-colors ${ringLight}`}>
                {link.label}
              </a>
            ))}
            <div className="border-t border-slate-200 py-2">
              <p className="px-6 py-2 text-xs font-semibold uppercase tracking-wider text-navy/60">About</p>
              {aboutLinks.map((link) => (
                <a key={link.href} href={link.href} {...homeLinkProps(link.href, link.label)} onClick={() => setOpen(false)} className={`block px-9 py-2 text-sm font-medium text-navy/75 hover:text-navy hover:bg-slate-50 transition-colors ${ringLight}`}>
                  {link.label}
                </a>
              ))}
            </div>
            <div className="border-y border-slate-200 py-2">
              <p className="px-6 py-2 text-xs font-semibold uppercase tracking-wider text-navy/60">Services</p>
              {serviceLinks.map((service) => (
                <a key={service.href} href={service.href} onClick={() => setOpen(false)} className={`block px-9 py-2 text-sm font-medium text-navy/75 hover:text-navy hover:bg-slate-50 transition-colors ${ringLight}`}>
                  {service.label}
                </a>
              ))}
            </div>
            <div className="border-b border-slate-200 py-2">
              <p className="px-6 py-2 text-xs font-semibold uppercase tracking-wider text-navy/60">Gallery</p>
              {galleryLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)} className={`block px-9 py-2 text-sm font-medium text-navy/75 hover:text-navy hover:bg-slate-50 transition-colors ${ringLight}`}>
                  {link.label}
                </a>
              ))}
            </div>
            {links.slice(3).map((link) => (
              <a key={link.href} href={link.href} {...homeLinkProps(link.href, link.label)} className={`block px-6 py-3 text-sm font-medium text-navy/75 hover:text-navy hover:bg-slate-50 transition-colors ${ringLight}`}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
