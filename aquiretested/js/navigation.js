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

  if (!mobileMenu) return;

  // A fixed drawer inside a backdrop-filter header is clipped to the header
  // bounds on mobile browsers. Move it to body so it uses the full viewport.
  if (mobileMenu.parentElement !== document.body) {
    document.body.appendChild(mobileMenu);
  }

  const closeMobileMenu = () => {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-menu-open');
  };

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('flex');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('mobile-menu-open');
      if (menuCloseBtn) menuCloseBtn.focus();
    });
  }

  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', closeMobileMenu);
  }

  mobileMenu.querySelectorAll('a[href]').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      closeMobileMenu();
      if (menuBtn) menuBtn.focus();
    }
  });
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

/* Language Switcher - Google Translate Integration for EN, HI, MR */
function initLanguageSwitcher() {
  const supportedLanguages = ['en', 'hi', 'mr'];
  const savedLanguage = localStorage.getItem('am_selected_language');
  const cookieLanguage = getLanguageCookie();
  const currentLang = supportedLanguages.includes(savedLanguage)
    ? savedLanguage
    : (supportedLanguages.includes(cookieLanguage) ? cookieLanguage : 'en');

  // Keep the cookie ready before Google's script starts reading it.
  setLanguageCookie(currentLang);
  document.documentElement.lang = currentLang;

  // Google must be able to render its select. Keeping the element off-screen
  // works; display:none can prevent the widget from being initialized.
  if (!document.getElementById('google_translate_element')) {
    const translateDiv = document.createElement('div');
    translateDiv.id = 'google_translate_element';
    translateDiv.setAttribute('aria-hidden', 'true');
    document.body.appendChild(translateDiv);
  }

  // Hide Google's UI without hiding every .skiptranslate element globally.
  if (!document.getElementById('google-translate-styles')) {
    const style = document.createElement('style');
    style.id = 'google-translate-styles';
    style.innerHTML = `
      #google_translate_element {
        position: fixed !important;
        left: -10000px !important;
        top: 0 !important;
        width: 1px !important;
        height: 1px !important;
        overflow: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
      .goog-te-banner-frame, .goog-te-banner, #goog-gt-tt, .goog-te-balloon-frame {
        display: none !important;
      }
      body {
        top: 0px !important;
        position: static !important;
      }
      .goog-text-highlight {
        background-color: transparent !important;
        box-shadow: none !important;
      }
      font {
        background-color: transparent !important;
        box-shadow: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Define the callback before loading Google's script.
  window.googleTranslateElementInit = function () {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'en,hi,mr',
        autoDisplay: false,
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
      },
      'google_translate_element'
    );

    // TranslateElement adds .goog-te-combo asynchronously after this callback.
    applyGoogleTranslation(currentLang);
  };

  // Load Google Translate once.
  if (!document.querySelector('script[src*="translate.google.com"]')) {
    const gtScript = document.createElement('script');
    gtScript.type = 'text/javascript';
    gtScript.async = true;
    gtScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(gtScript);
  }

  // Synchronize desktop and mobile selects.
  const languageSelects = document.querySelectorAll('.language-select');
  languageSelects.forEach((select) => {
    select.value = currentLang;

    select.addEventListener('change', (e) => {
      const selectedLang = e.target.value;
      if (!supportedLanguages.includes(selectedLang)) return;

      localStorage.setItem('am_selected_language', selectedLang);
      setLanguageCookie(selectedLang);
      document.documentElement.lang = selectedLang;

      languageSelects.forEach((otherSelect) => {
        otherSelect.value = selectedLang;
      });

      applyGoogleTranslation(selectedLang);
    });
  });
}

function applyGoogleTranslation(targetLang, attempt = 0) {
  const combo = document.querySelector('#google_translate_element .goog-te-combo');

  if (!combo) {
    // Wait up to 10 seconds for Google's asynchronously-created select.
    if (attempt < 40) {
      window.setTimeout(() => applyGoogleTranslation(targetLang, attempt + 1), 250);
    }
    return;
  }

  // Dispatch even when the combo already shows the requested language:
  // the cookie can preselect it before the page content is translated.
  combo.value = targetLang;
  combo.dispatchEvent(new Event('change', { bubbles: true }));
}

function getLanguageCookie() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, ...valueParts] = cookie.trim().split('=');
    if (name === 'googtrans') {
      const parts = decodeURIComponent(valueParts.join('=')).split('/');
      const language = parts[parts.length - 1];
      if (['en', 'hi', 'mr'].includes(language)) return language;
    }
  }
  return null;
}

function setLanguageCookie(lang) {
  const host = window.location.hostname;
  const targetVal = `/en/${lang}`;

  // Remove older domain-scoped variants created by previous versions.
  if (host && host !== 'localhost' && !host.startsWith('127.')) {
    document.cookie = `googtrans=; path=/; domain=${host}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `googtrans=; path=/; domain=.${host}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }

  // A host-only cookie is sufficient and avoids conflicting duplicate values.
  document.cookie = `googtrans=${targetVal}; path=/; SameSite=Lax`;
}
