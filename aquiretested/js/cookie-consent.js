(function cookieConsentController() {
  'use strict';

  const COOKIE_NAME = 'am_cookie_consent';
  const CONSENT_VERSION = 1;
  const MAX_AGE = 60 * 60 * 24 * 180;
  let lastFocusedElement = null;

  function readConsent() {
    const raw = document.cookie.split('; ').find((item) => item.startsWith(`${COOKIE_NAME}=`));
    if (!raw) return null;
    try {
      const value = JSON.parse(decodeURIComponent(raw.slice(COOKIE_NAME.length + 1)));
      return value.version === CONSENT_VERSION ? value : null;
    } catch {
      return null;
    }
  }

  function writeConsent(preferences) {
    const previous = readConsent();
    const value = {
      version: CONSENT_VERSION,
      necessary: true,
      functional: Boolean(preferences.functional),
      analytics: Boolean(preferences.analytics),
      updatedAt: new Date().toISOString(),
    };
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(value))}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax${secure}`;
    removeDeclinedCookies(value);
    window.dispatchEvent(new CustomEvent('am:consentchange', { detail: value }));
    hideBanner();
    closePreferences();

    if (Boolean(previous?.functional) !== value.functional && document.querySelector('.language-select')) {
      location.reload();
    }
    return value;
  }

  function expireCookie(name, domain = '') {
    const domainPart = domain ? `; Domain=${domain}` : '';
    document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax${domainPart}`;
  }

  function removeDeclinedCookies(consent) {
    if (!consent.functional) {
      expireCookie('googtrans');
      const host = location.hostname;
      if (host && host !== 'localhost') expireCookie('googtrans', host);
      for (const root of ['aquireandmanage.com', 'aquireandmanage.in']) {
        if (host === root || host.endsWith(`.${root}`)) expireCookie('googtrans', `.${root}`);
      }
      localStorage.removeItem('am_selected_language');
    }
    if (!consent.analytics) {
      for (const name of document.cookie.split('; ').map((item) => item.split('=')[0])) {
        if (/^_ga(?:_|$)|^_gid$|^_gat/.test(name)) expireCookie(name);
      }
    }
  }

  function createInterface() {
    if (document.getElementById('am-cookie-banner')) return;
    const banner = document.createElement('section');
    banner.id = 'am-cookie-banner';
    banner.className = 'am-cookie-banner';
    banner.setAttribute('aria-labelledby', 'am-cookie-title');
    banner.innerHTML = `
      <div class="am-cookie-banner__layout">
        <div><h2 id="am-cookie-title">Your privacy choices</h2><p>We use a necessary cookie to remember your choice. With permission, functional cookies enable website translation and analytics cookies may help us improve the site. <a href="privacy#cookies">Cookie details</a></p></div>
        <div class="am-cookie-actions"><button class="am-cookie-button" type="button" data-cookie-action="reject">Reject optional</button><button class="am-cookie-button" type="button" data-cookie-action="preferences">Preferences</button><button class="am-cookie-button am-cookie-button--primary" type="button" data-cookie-action="accept">Accept all</button></div>
      </div>`;

    const backdrop = document.createElement('div');
    backdrop.id = 'am-cookie-modal-backdrop';
    backdrop.className = 'am-cookie-modal-backdrop';
    backdrop.hidden = true;
    backdrop.innerHTML = `
      <div class="am-cookie-modal" role="dialog" aria-modal="true" aria-labelledby="am-cookie-modal-title">
        <div class="am-cookie-modal__header"><h2 id="am-cookie-modal-title">Cookie preferences</h2><button type="button" class="am-cookie-close" data-cookie-action="close" aria-label="Close cookie preferences">&times;</button></div>
        <p>Choose which optional cookies A&amp;M Advisory may use. You can change this choice at any time from the website footer.</p>
        <label class="am-cookie-category"><span><strong>Necessary</strong><p>Stores your consent choice and supports website security. Always active.</p></span><input type="checkbox" checked disabled aria-label="Necessary cookies always active" /></label>
        <label class="am-cookie-category"><span><strong>Functional</strong><p>Enables Google Translate and remembers Hindi, English or Marathi selection.</p></span><input id="am-cookie-functional" type="checkbox" /></label>
        <label class="am-cookie-category"><span><strong>Analytics</strong><p>Permits privacy-conscious measurement tools if they are added to the website.</p></span><input id="am-cookie-analytics" type="checkbox" /></label>
        <div class="am-cookie-actions" style="margin-top:1.25rem"><button class="am-cookie-button" type="button" data-cookie-action="reject">Reject optional</button><button class="am-cookie-button am-cookie-button--primary" type="button" data-cookie-action="save">Save preferences</button></div>
      </div>`;

    document.body.append(banner, backdrop);
    document.querySelectorAll('nav[aria-label="Legal"]').forEach((nav) => {
      if (nav.querySelector('[data-cookie-action="preferences"]')) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'am-cookie-preferences-link mx-2 hover:text-white';
      button.dataset.cookieAction = 'preferences';
      button.textContent = 'Cookie Preferences';
      nav.appendChild(button);
    });
  }

  function hideBanner() {
    const banner = document.getElementById('am-cookie-banner');
    if (banner) banner.hidden = true;
  }

  function openPreferences(trigger) {
    const consent = readConsent() || { functional: false, analytics: false };
    const backdrop = document.getElementById('am-cookie-modal-backdrop');
    if (!backdrop) return;
    lastFocusedElement = trigger || document.activeElement;
    document.getElementById('am-cookie-functional').checked = consent.functional;
    document.getElementById('am-cookie-analytics').checked = consent.analytics;
    backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
    backdrop.querySelector('.am-cookie-close').focus();
  }

  function closePreferences() {
    const backdrop = document.getElementById('am-cookie-modal-backdrop');
    if (!backdrop || backdrop.hidden) return;
    backdrop.hidden = true;
    document.body.style.overflow = '';
    lastFocusedElement?.focus();
  }

  function handleAction(event) {
    const trigger = event.target.closest('[data-cookie-action]');
    if (!trigger) return;
    const action = trigger.dataset.cookieAction;
    if (action === 'accept') writeConsent({ functional: true, analytics: true });
    if (action === 'reject') writeConsent({ functional: false, analytics: false });
    if (action === 'preferences') openPreferences(trigger);
    if (action === 'close') closePreferences();
    if (action === 'save') writeConsent({
      functional: document.getElementById('am-cookie-functional').checked,
      analytics: document.getElementById('am-cookie-analytics').checked,
    });
  }

  window.AMCookieConsent = {
    get: readConsent,
    has(category) {
      const consent = readConsent();
      return category === 'necessary' || Boolean(consent?.[category]);
    },
    openPreferences,
  };

  document.addEventListener('DOMContentLoaded', () => {
    createInterface();
    document.addEventListener('click', handleAction);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closePreferences();
    });
    if (readConsent()) hideBanner();
  });
}());
