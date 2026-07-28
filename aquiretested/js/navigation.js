/**
 * A&M Advisory - Navigation & Search Handler
 * ES6 Vanilla JavaScript for header navigation, mobile menu, search modal, and language switcher.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initDropdowns();
  initActiveLinks();
  initStickyHeader();
  initSearchModal();
  initLanguageSwitcher();
});

/* Dropdown Menu Click & Touch Toggle Handler */
function initDropdowns() {
  const dropdownItems = document.querySelectorAll('.nav-dropdown-item');

  dropdownItems.forEach((item) => {
    const trigger = item.querySelector('.nav-dropdown-trigger');
    const menu = item.querySelector('.nav-dropdown-menu');

    if (!trigger || !menu) return;

    // Toggle on click for touch devices or keyboard users
    trigger.addEventListener('click', (e) => {
      // On mobile or small screens, toggle dropdown visibility
      if (window.innerWidth < 768) {
        e.preventDefault();
        const isOpen = item.classList.contains('active-dropdown');
        closeAllDropdowns();
        if (!isOpen) {
          item.classList.add('active-dropdown');
          menu.classList.remove('opacity-0', 'invisible', 'translate-y-2');
          menu.classList.add('opacity-100', 'visible', 'translate-y-0');
        }
      }
    });
  });

  function closeAllDropdowns() {
    dropdownItems.forEach((item) => {
      item.classList.remove('active-dropdown');
      const menu = item.querySelector('.nav-dropdown-menu');
      if (menu) {
        menu.classList.add('opacity-0', 'invisible', 'translate-y-2');
        menu.classList.remove('opacity-100', 'visible', 'translate-y-0');
      }
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown-item')) {
      closeAllDropdowns();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllDropdowns();
    }
  });
}

/* Mobile Menu Toggle */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-button');
  const menuCloseBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('mobile-menu-open');
    });
  }

  if (menuCloseBtn && mobileMenu) {
    menuCloseBtn.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('mobile-menu-open');
    });
  }
}

/* Active Link Highlighting */
function initActiveLinks() {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/index.html';
  const navLinks = document.querySelectorAll('nav a[href], #mobile-menu a[href]');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Normalize href
    const linkPath = href.split('#')[0].replace(/\/$/, '');
    if ((linkPath === '' && currentPath.endsWith('index.html')) || linkPath === currentPath) {
      link.classList.add('text-crimson', 'font-bold');
    }
  });
}

/* Sticky Header Backdrop */
function initStickyHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('shadow-md', 'bg-white/95', 'backdrop-blur-md');
    } else {
      header.classList.remove('shadow-md');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

/* Search Modal Implementation */
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
  { label: 'Contact Us', href: '/contact.html', terms: ['contact', 'phone', 'email', 'office'] },
];

function initSearchModal() {
  const searchToggleBtns = document.querySelectorAll('.search-toggle-btn');
  const searchModal = document.getElementById('search-modal');
  const searchCloseBtn = document.getElementById('search-modal-close');
  const searchInput = document.getElementById('site-search-input');
  const searchResults = document.getElementById('site-search-results');

  if (!searchModal) return;

  searchToggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      searchModal.classList.remove('hidden');
      searchModal.classList.add('flex');
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      renderSearchResults('');
    });
  });

  if (searchCloseBtn) {
    searchCloseBtn.addEventListener('click', () => {
      searchModal.classList.add('hidden');
      searchModal.classList.remove('flex');
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value);
    });
  }

  function renderSearchResults(query) {
    if (!searchResults) return;
    const cleanQuery = query.trim().toLowerCase();
    
    if (!cleanQuery) {
      searchResults.innerHTML = '<p class="text-xs text-slate-500 py-4 text-center">Type to search website pages...</p>';
      return;
    }

    const matches = searchTargets.filter((item) =>
      item.label.toLowerCase().includes(cleanQuery) ||
      item.terms.some((term) => term.includes(cleanQuery))
    );

    if (matches.length === 0) {
      searchResults.innerHTML = `<p class="text-xs text-slate-500 py-4 text-center">No results found for "${query}"</p>`;
      return;
    }

    searchResults.innerHTML = matches.map((item) => `
      <a href="${item.href}" class="flex items-center justify-between p-3 rounded-lg hover:bg-slate-100 transition text-sm font-semibold text-navy">
        <span>${item.label}</span>
        <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </a>
    `).join('');
  }
}

/* Language Switcher */
function initLanguageSwitcher() {
  const languageSelects = document.querySelectorAll('.language-select');
  languageSelects.forEach((select) => {
    select.addEventListener('change', (e) => {
      const lang = e.target.value;
      setLanguageCookie(lang);
      window.location.reload();
    });
  });
}

function setLanguageCookie(lang) {
  document.cookie = `googtrans=/en/${lang}; path=/; domain=${window.location.hostname}`;
  document.cookie = `googtrans=/en/${lang}; path=/;`;
}
