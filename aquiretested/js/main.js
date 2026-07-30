/**
 * A&M Advisory - Main Core Interactivity
 * ES6 Vanilla JavaScript for FAQ accordion, Mumbai Footprint Map, page loader, and gallery filters.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHomepageSectionOrder();
  initPageLoader();
  initFaqAccordion();
  initMumbaiMap();
  initGalleryFilter();
  initTimelineAnimation();
  initStatsCounter();
});

/* Keep the homepage's priority sections in the requested visible sequence. */
function initHomepageSectionOrder() {
  const statistics = document.getElementById('hero-statistics');
  const clients = document.getElementById('clients');
  const updates = document.getElementById('sra-updates');
  const process = document.getElementById('process');
  const testimonials = document.getElementById('testimonials');
  const feedback = document.getElementById('client-feedback');

  if (!statistics || !clients || !updates || !process) return;

  statistics.after(clients);
  clients.after(updates);
  updates.after(process);

  const testimonialsContent = testimonials?.querySelector(':scope > div');
  if (testimonialsContent && feedback) {
    testimonialsContent.append(feedback);
  }
}

/* Page Loader Fadeout */
function initPageLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => loader.remove(), 500);
  }, 300);
}

/* FAQ Accordion Toggle */
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll('.faq-accordion-button');

  faqButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      const group = button.closest('.faq-group');
      if (group) {
        group.querySelectorAll('.faq-accordion-button').forEach((b) => {
          b.setAttribute('aria-expanded', 'false');
          if (b.nextElementSibling) b.nextElementSibling.classList.add('hidden');
          const icon = b.querySelector('.faq-icon');
          if (icon) icon.classList.remove('rotate-180');
        });
      }

      if (!isExpanded && content) {
        button.setAttribute('aria-expanded', 'true');
        content.classList.remove('hidden');
        const icon = button.querySelector('.faq-icon');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });
}

/* Mumbai Footprint Interactive Map */
const types = [
  { label: 'SRA Projects', pin: '#ed1b45' },
  { label: 'Slum Rehabilitation', pin: '#8b5cf6' },
  { label: 'MHADA', pin: '#f59e0b' },
  { label: 'Redevelopment', pin: '#2563eb' },
];

const mapLocations = [
  { id: 1, area: 'South Mumbai', zone: 'Island City', type: 'Redevelopment', x: 48, y: 83, description: 'Urban renewal and stakeholder advisory coverage.' },
  { id: 2, area: 'Worli–Prabhadevi', zone: 'Central Mumbai', type: 'MHADA', x: 51, y: 68, description: 'Housing and redevelopment coordination coverage.' },
  { id: 3, area: 'Sion', zone: 'Central Mumbai', type: 'SRA Projects', x: 62, y: 50, description: 'SRA and community engagement advisory coverage.' },
  { id: 4, area: 'Bandra–Khar', zone: 'Western Suburbs', type: 'SRA Projects', x: 38, y: 47, description: 'Tenant and rehabilitation advisory coverage.' },
  { id: 5, area: 'Kurla–Chembur', zone: 'Eastern Suburbs', type: 'MHADA', x: 68, y: 43, description: 'Documentation and authority coordination coverage.' },
  { id: 6, area: 'Andheri–Jogeshwari', zone: 'Western Suburbs', type: 'Redevelopment', x: 34, y: 29, description: 'Redevelopment planning and liaisoning coverage.' },
  { id: 7, area: 'Ghatkopar–Vikhroli', zone: 'Eastern Suburbs', type: 'SRA Projects', x: 70, y: 27, description: 'SRA execution and stakeholder support coverage.' },
  { id: 8, area: 'Borivali–Kandivali', zone: 'Western Suburbs', type: 'Redevelopment', x: 31, y: 11, description: 'Residential redevelopment advisory coverage.' },
  { id: 9, area: 'Malad–Goregaon', zone: 'Western Suburbs', type: 'Slum Rehabilitation', x: 27, y: 20, description: 'Resident engagement, eligibility documentation and rehabilitation support coverage.' },
  { id: 10, area: 'Govandi–Mankhurd', zone: 'Eastern Suburbs', type: 'Slum Rehabilitation', x: 78, y: 48, description: 'Community coordination, shifting readiness and rehabilitation advisory coverage.' },
  { id: 11, area: 'Dharavi', zone: 'Central Mumbai', type: 'Slum Rehabilitation', x: 53, y: 56, description: 'Large-scale rehabilitation, tenant management and community stakeholder coordination coverage.' },
  { id: 12, area: 'Antop Hill', zone: 'Central Mumbai', type: 'Slum Rehabilitation', x: 67, y: 58, description: 'Slum rehabilitation, resident documentation and on-ground stakeholder coordination coverage.' },
  { id: 13, area: 'Juhu Gali', zone: 'Western Suburbs', type: 'Slum Rehabilitation', x: 27, y: 34, description: 'Resident engagement, rehabilitation documentation and community coordination coverage.' },
];

function initMumbaiMap() {
  const pinContainer = document.getElementById('map-pins-container');
  const typeFilterBtns = document.querySelectorAll('.map-type-filter-btn');
  const resetBtn = document.getElementById('map-reset-btn');

  const selectedBadge = document.getElementById('map-selected-badge');
  const selectedZone = document.getElementById('map-selected-zone');
  const selectedArea = document.getElementById('map-selected-area');
  const selectedDesc = document.getElementById('map-selected-desc');

  if (!pinContainer) return;

  let activeType = 'All';
  let selectedId = 3; // Default to Sion

  function renderPins() {
    const visibleLocations = activeType === 'All'
      ? mapLocations
      : mapLocations.filter(loc => loc.type === activeType);

    pinContainer.innerHTML = visibleLocations.map(location => {
      const typeConfig = types.find(t => t.label === location.type) || types[0];
      const isSelected = location.id === selectedId;

      return `
        <button
          type="button"
          data-id="${location.id}"
          class="map-pin-btn absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none transition group"
          style="left: ${location.x}%; top: ${location.y}%;"
          aria-label="${location.area}, ${location.type}"
          aria-pressed="${isSelected}"
        >
          <span
            class="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 animate-ping ${isSelected ? 'block' : 'hidden group-hover:block'}"
            style="background-color: ${typeConfig.pin};"
          ></span>
          <span
            class="relative grid place-items-center rounded-full border-2 border-white text-white shadow-lg transition-all ${
              isSelected ? 'h-11 w-11 scale-110' : 'h-8 w-8 group-hover:scale-110'
            }"
            style="background-color: ${typeConfig.pin};"
          >
            📍
          </span>
        </button>
      `;
    }).join('');

    updateDetails();
  }

  function updateDetails() {
    const selected = mapLocations.find(l => l.id === selectedId) || mapLocations[0];
    const typeConfig = types.find(t => t.label === selected.type) || types[0];

    if (selectedBadge) {
      selectedBadge.textContent = selected.type;
      selectedBadge.style.backgroundColor = typeConfig.pin;
    }
    if (selectedZone) selectedZone.textContent = selected.zone;
    if (selectedArea) selectedArea.textContent = selected.area;
    if (selectedDesc) selectedDesc.textContent = selected.description;
  }

  // Event Listeners
  pinContainer.addEventListener('click', (e) => {
    const pinBtn = e.target.closest('.map-pin-btn');
    if (!pinBtn) return;
    selectedId = parseInt(pinBtn.getAttribute('data-id'), 10);
    renderPins();
  });

  typeFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeFilterBtns.forEach(b => {
        b.classList.remove('border-white', 'bg-white', 'text-navy');
        b.classList.add('border-white/20', 'text-slate-300');
        b.setAttribute('aria-pressed', 'false');
      });

      btn.classList.remove('border-white/20', 'text-slate-300');
      btn.classList.add('border-white', 'bg-white', 'text-navy');
      btn.setAttribute('aria-pressed', 'true');

      activeType = btn.getAttribute('data-type');
      const next = activeType === 'All' ? mapLocations[0] : mapLocations.find(l => l.type === activeType);
      if (next) selectedId = next.id;

      renderPins();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      activeType = 'All';
      selectedId = 3;
      typeFilterBtns.forEach(b => {
        const type = b.getAttribute('data-type');
        if (type === 'All') {
          b.classList.add('border-white', 'bg-white', 'text-navy');
          b.classList.remove('border-white/20', 'text-slate-300');
        } else {
          b.classList.remove('border-white', 'bg-white', 'text-navy');
          b.classList.add('border-white/20', 'text-slate-300');
        }
      });
      renderPins();
    });
  }

  renderPins();
}

/* Gallery Filter */
function initGalleryFilter() {
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!galleryFilterBtns.length) return;

  galleryFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-category');

      galleryFilterBtns.forEach((b) => {
        b.classList.remove('bg-crimson', 'text-white');
        b.classList.add('bg-slate-200', 'text-slate-700');
      });

      btn.classList.remove('bg-slate-200', 'text-slate-700');
      btn.classList.add('bg-crimson', 'text-white');

      galleryItems.forEach((item) => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

/* Process Timeline Scroll Reveal Animation */
function initTimelineAnimation() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  const lineFill = document.querySelector('.timeline-line-fill');

  if (!timelineItems.length && !lineFill) return;

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);

  if (lineFill) observer.observe(lineFill);
  timelineItems.forEach((item) => observer.observe(item));
}

/* Hero Statistics Count Up Animation */
function initStatsCounter() {
  const statElements = document.querySelectorAll('.stat-counter');
  if (!statElements.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statElements.forEach((el) => {
          const target = parseInt(el.getAttribute('data-target'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 2000;
          const startTime = performance.now();

          function updateCount(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeProgress * target);

            el.textContent = currentCount.toLocaleString('en-US') + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              el.textContent = target.toLocaleString('en-US') + suffix;
            }
          }

          requestAnimationFrame(updateCount);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('hero-statistics');
  if (statsSection) observer.observe(statsSection);
}

// Brochure, Video Modals & Phone Input Restriction
document.addEventListener('DOMContentLoaded', () => {
  initPhoneInputRestriction();
  initBrochureModal();
  initVideoModal();
});

function initPhoneInputRestriction() {
  const phoneInputs = document.querySelectorAll('input[type="tel"], input[name="phone"], #brochure-phone, #quick-phone');
  
  phoneInputs.forEach((input) => {
    // Strip non-digits and cap at 10 digits
    input.addEventListener('input', function () {
      this.value = this.value.replace(/\D/g, '').slice(0, 10);
    });

    // Block non-numeric key presses
    input.addEventListener('keypress', function (e) {
      if (!/[0-9]/.test(e.key) || this.value.length >= 10) {
        e.preventDefault();
      }
    });

    // Block paste of non-numeric text
    input.addEventListener('paste', function (e) {
      e.preventDefault();
      const pastedData = (e.clipboardData || window.clipboardData).getData('text');
      const numericData = pastedData.replace(/\D/g, '').slice(0, 10);
      this.value = numericData;
    });
  });
}

function initBrochureModal() {
  const openBtn = document.getElementById('open-brochure-modal-btn');
  const modal = document.getElementById('brochure-modal');
  const closeBtn = document.getElementById('close-brochure-modal-btn');
  const form = document.getElementById('brochure-download-form');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => modal.classList.remove('hidden'));
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const bName = document.getElementById('brochure-name')?.value.trim();
      const bEmail = document.getElementById('brochure-email')?.value.trim();
      const bPhone = document.getElementById('brochure-phone')?.value.trim();

      const leadPayload = {
        id: 'company-profile-lead-' + Date.now(),
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        name: bName,
        email: bEmail,
        phone: bPhone,
        requirement: 'Requested Official A&M Advisory Company Profile (PPT / PDF)',
        sourcePage: window.location.pathname
      };

      // Save to database
      try {
        let existing = JSON.parse(localStorage.getItem('am_advisory_leads')) || [];
        existing.unshift(leadPayload);
        localStorage.setItem('am_advisory_leads', JSON.stringify(existing));
      } catch (err) {}

      alert('Thank you ' + bName + '! The official A&M Advisory Company Profile (PPT / PDF) is downloading. Opening WhatsApp to connect with our Bandra East office...');
      modal.classList.add('hidden');

      // WhatsApp Redirect
      setTimeout(() => {
        const waMsg = encodeURIComponent(
          `*Company Profile Request (A&M Advisory)*\n\n` +
          `*Name:* ${bName}\n` +
          `*Mobile:* ${bPhone}\n` +
          `*Email:* ${bEmail}\n` +
          `*Request:* Downloaded Company Profile Presentation`
        );
        window.open(`https://wa.me/919167485843?text=${waMsg}`, '_blank');
      }, 1000);

      form.reset();
    });
  }
}

function initVideoModal() {
  const playBtns = document.querySelectorAll('.video-play-btn');
  const videoModal = document.getElementById('video-modal');
  const closeVideoBtn = document.getElementById('close-video-modal-btn');

  playBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (videoModal) videoModal.classList.remove('hidden');
    });
  });

  if (closeVideoBtn && videoModal) {
    closeVideoBtn.addEventListener('click', () => videoModal.classList.add('hidden'));
  }
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) videoModal.classList.add('hidden');
    });
  }
}

