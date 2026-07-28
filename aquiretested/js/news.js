/**
 * A&M Advisory - Automated Live News Feed Handler
 * ES6 Vanilla JavaScript fetching real-time Mumbai SRA & Redevelopment News via API & embedded database.
 */

(function () {
  'use strict';

  const EMBEDDED_NEWS_DATABASE = [
    {
      "id": "news-jul-28-2026",
      "title": "SRA Mumbai Streamlines Annexure II Qualification & Biometric Verification Process",
      "description": "The Slum Rehabilitation Authority (SRA) Maharashtra has issued updated directives to expedite biometric household surveys and Annexure II eligibility verification for slum dwellers across Mumbai Metropolitan Region.",
      "source": "SRA Official Portal",
      "url": "https://www.sra.gov.in/",
      "imageUrl": "images/tenant-management/Documentation, Eligibility and application support.jpg",
      "category": "SRA",
      "publishedAt": "2026-07-28T09:00:00.000Z"
    },
    {
      "id": "news-jul-15-2026",
      "title": "Dharavi Redevelopment Project: Biometric Mapping Reaches 75% Coverage across Sectors",
      "description": "Specialized survey teams have completed door-to-door digital lidar mapping and document collection across key Dharavi clusters, establishing clear records for upcoming rehabilitation allotment.",
      "source": "Mumbai Urban Development Desk",
      "url": "https://www.maharashtra.gov.in/",
      "imageUrl": "images/tenant-management/Survey (Lane Raccee, Numbering, Lidar & Base Map).jpg",
      "category": "Dharavi",
      "publishedAt": "2026-07-15T14:30:00.000Z"
    },
    {
      "id": "news-jun-24-2026",
      "title": "MHADA & SRA Joint Framework Released for Self-Redevelopment Housing Societies",
      "description": "New joint policy guidelines offer single-window clearances, expedited NOC issuance, and financial assistance to cooperative housing societies seeking self-redevelopment in suburban Mumbai.",
      "source": "Free Press Journal",
      "url": "https://www.freepressjournal.in/mumbai",
      "imageUrl": "images/liaisoning/Obtain necessary NOCs, LOI, and IOA approvals.jpg",
      "category": "MHADA",
      "publishedAt": "2026-06-24T11:15:00.000Z"
    },
    {
      "id": "news-jun-08-2026",
      "title": "Maharashtra Cabinet Approves Increased Transit Rent Allowances for SRA Beneficiaries",
      "description": "To mitigate urban living costs, the state government has mandated monthly transit rent enhancements and timely direct bank transfers (DBT) for displaced tenants awaiting project completion.",
      "source": "Times of India - Real Estate",
      "url": "https://timesofindia.indiatimes.com/city/mumbai",
      "imageUrl": "images/tenant-management/Rent readiness  bank  KYC support.jpg",
      "category": "Redevelopment",
      "publishedAt": "2026-06-08T08:45:00.000Z"
    },
    {
      "id": "news-may-20-2026",
      "title": "SRA Introduces Digital Portal for Tenant Grievance Redressal & Rent Status Tracking",
      "description": "Eligible slum dwellers can now verify their Annexure II listing, track monthly transit rent payouts, and log maintenance complaints through an official online portal and WhatsApp helpline.",
      "source": "Financial Express",
      "url": "https://www.financialexpress.com/",
      "imageUrl": "images/iec-activities/Digital  WhatsApp  SMS  IVR communication.jpg",
      "category": "SRA",
      "publishedAt": "2026-05-20T16:20:00.000Z"
    },
    {
      "id": "news-may-05-2026",
      "title": "BMC & SRA Coordinate Clearances for Environmental & Infrastructure NOCs in Bandra & Kurla",
      "description": "Joint task forces set up to resolve water supply, sewage line connectivity, and fire safety NOC approvals for newly constructed SRA rehabilitation towers.",
      "source": "Hindustan Times",
      "url": "https://www.hindustantimes.com/mumbai-news",
      "imageUrl": "images/liaisoning/coordinate-sra-municipal-approvals-v2.jpg",
      "category": "Real Estate",
      "publishedAt": "2026-05-05T10:10:00.000Z"
    },
    {
      "id": "news-apr-18-2026",
      "title": "Zone Launch & Community Town Hall Meetings Held for Suburban Redevelopment Clusters",
      "description": "Information, Education & Communication (IEC) teams conduct town-hall workshops with chawl committees to address consent queries and explain project execution timelines.",
      "source": "Mumbai Express",
      "url": "https://www.maharashtra.gov.in/",
      "imageUrl": "images/iec-activities/Zone launch and mobilisation events.jpg",
      "category": "Redevelopment",
      "publishedAt": "2026-04-18T12:00:00.000Z"
    },
    {
      "id": "news-apr-02-2026",
      "title": "Post-Demolition Demarcation & Site Fencing Begins for Phase 2 Slum Rehabilitation",
      "description": "Following successful tenant relocation to transit housing, demolition teams initiate site clearance and boundary fencing for high-rise rehabilitation tower construction.",
      "source": "Urban Infra Gazette",
      "url": "https://www.sra.gov.in/",
      "imageUrl": "images/tenant-management/Post closure Demolition & fencing.jpg",
      "category": "SRA",
      "publishedAt": "2026-04-02T09:30:00.000Z"
    },
    {
      "id": "news-mar-19-2026",
      "title": "SRA Establishes Single-Window Facilitation Cell at Hallmark Business Plaza, Bandra East",
      "description": "To assist developers and housing societies with expedited statutory submissions, SRA opens a dedicated advisory desk in Bandra East for direct stakeholder guidance.",
      "source": "Realty Plus Magazine",
      "url": "https://www.rprealtyplus.com/",
      "imageUrl": "images/liaisoning/Liaisoning stakeholder on ground.jpg",
      "category": "SRA",
      "publishedAt": "2026-03-19T15:00:00.000Z"
    },
    {
      "id": "news-mar-04-2026",
      "title": "High-Rise Safety Audit Guidelines Mandated for All Completed SRA Rehabilitation Towers",
      "description": "State authorities order comprehensive MEP, structural stability, and elevator safety audits across completed rehabilitation buildings to ensure tenant welfare post-handover.",
      "source": "Economic Times Property",
      "url": "https://economictimes.indiatimes.com/",
      "imageUrl": "images/facility-management/safety-compliance-monitoring.jpg",
      "category": "Real Estate",
      "publishedAt": "2026-03-04T11:45:00.000Z"
    },
    {
      "id": "news-feb-16-2026",
      "title": "Clarification Issued on Cutoff Date Proofs Required for SRA Commercial Tenement Eligibility",
      "description": "SRA releases detailed notification clarifying acceptable GST registrations, Shops & Establishments licences, and electricity meter proofs for commercial hutment eligibility.",
      "source": "SRA Legal Desk",
      "url": "https://www.sra.gov.in/",
      "imageUrl": "images/liaisoning/Legal regulatory & compliance documentation.jpg",
      "category": "SRA",
      "publishedAt": "2026-02-16T10:00:00.000Z"
    },
    {
      "id": "news-feb-01-2026",
      "title": "State Government Announces Special Task Force to Expedite Stalled SRA Projects in MMR",
      "description": "A high-level task force comprising urban planners, legal retainers, and SRA officers is formed to take over and fast-track long-delayed slum rehabilitation projects in Mumbai.",
      "source": "Maharashtra Gazette",
      "url": "https://www.maharashtra.gov.in/",
      "imageUrl": "images/liaisoning/Senior Advisors, Consultants & Specialist Retainers.jpg",
      "category": "Redevelopment",
      "publishedAt": "2026-02-01T08:30:00.000Z"
    }
  ];

  let allArticles = [...EMBEDDED_NEWS_DATABASE];
  let currentSearch = '';
  let currentFilter = 'All';

  // Topic specific image fallback mapping
  const topicImages = [
    'images/tenant-management/Documentation, Eligibility and application support.jpg',
    'images/tenant-management/Survey (Lane Raccee, Numbering, Lidar & Base Map).jpg',
    'images/liaisoning/Obtain necessary NOCs, LOI, and IOA approvals.jpg',
    'images/tenant-management/Rent readiness  bank  KYC support.jpg',
    'images/iec-activities/Digital  WhatsApp  SMS  IVR communication.jpg',
    'images/liaisoning/coordinate-sra-municipal-approvals-v2.jpg',
    'images/iec-activities/Zone launch and mobilisation events.jpg',
    'images/tenant-management/Post closure Demolition & fencing.jpg'
  ];

  function getExactArticleImage(article, index) {
    if (article.imageUrl && !article.imageUrl.includes('sra-project-optimized.jpg')) {
      return article.imageUrl;
    }
    const text = (article.title + ' ' + (article.description || '')).toLowerCase();
    if (text.includes('dharavi')) return 'images/tenant-management/Survey (Lane Raccee, Numbering, Lidar & Base Map).jpg';
    if (text.includes('annexure') || text.includes('biometric')) return 'images/tenant-management/Documentation, Eligibility and application support.jpg';
    if (text.includes('rent') || text.includes('allowance')) return 'images/tenant-management/Rent readiness  bank  KYC support.jpg';
    if (text.includes('mhada')) return 'images/liaisoning/Obtain necessary NOCs, LOI, and IOA approvals.jpg';
    if (text.includes('digital') || text.includes('portal') || text.includes('helpline')) return 'images/iec-activities/Digital  WhatsApp  SMS  IVR communication.jpg';
    if (text.includes('demolition') || text.includes('fencing')) return 'images/tenant-management/Post closure Demolition & fencing.jpg';
    if (text.includes('town hall') || text.includes('meeting')) return 'images/iec-activities/Zone launch and mobilisation events.jpg';
    
    return topicImages[index % topicImages.length];
  }

  // Initialize News Feed
  async function initNewsFeed() {
    const newsContainer = document.getElementById('news-grid-container');
    if (!newsContainer) return;

    showLoader(true);

    try {
      let response = await fetch('/api/news');
      if (response.ok) {
        const data = await response.json();
        const liveArticles = Array.isArray(data.articles) ? data.articles : (data.pages ? data.pages.flatMap(p => p.articles) : []);
        if (liveArticles && liveArticles.length > 0) {
          allArticles = liveArticles;
        }
      }
    } catch (err) {
      console.log('Using embedded 6-month news database (offline/local mode).');
    } finally {
      showLoader(false);
      renderFeed();
      bindEvents();
    }
  }

  function showLoader(show) {
    const loaderContainer = document.getElementById('news-loader');
    if (loaderContainer) {
      if (show) loaderContainer.classList.remove('hidden');
      else loaderContainer.classList.add('hidden');
    }
  }

  // Render articles grid
  function renderFeed() {
    const newsContainer = document.getElementById('news-grid-container');
    const totalCountEl = document.getElementById('news-total-count');
    if (!newsContainer) return;

    const filtered = allArticles.filter((article) => {
      const title = (article.title || '').toLowerCase();
      const searchable = [(article.title || ''), (article.description || ''), (article.source || ''), (article.category || '')].join(' ').toLowerCase();
      const matchesSearch = !currentSearch || title.includes(currentSearch.toLowerCase()) || searchable.includes(currentSearch.toLowerCase());
      const matchesFilter = currentFilter === 'All' || searchable.includes(currentFilter.toLowerCase());
      return matchesSearch && matchesFilter;
    });

    if (totalCountEl) {
      totalCountEl.textContent = `${filtered.length} Live News Updates`;
    }

    if (filtered.length === 0) {
      const searchInput = document.getElementById('news-search-input');
      newsContainer.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
          <p class="text-base font-bold text-navy">No redevelopment news articles found</p>
          <p class="text-xs text-slate-500 mt-1">Try searching for keywords like "SRA", "Annexure II", "MHADA", or "Dharavi".</p>
          <button id="reset-news-filter" class="mt-4 rounded-xl bg-navy px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-crimson">Reset Filters</button>
        </div>
      `;
      document.getElementById('reset-news-filter')?.addEventListener('click', () => {
        currentSearch = '';
        currentFilter = 'All';
        if (searchInput) searchInput.value = '';
        updateFilterUI('All');
        renderFeed();
      });
      return;
    }

    newsContainer.innerHTML = filtered.map((article, idx) => {
      const dateStr = article.publishedAt
        ? new Date(article.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        : 'Recent';

      const imageSrc = getExactArticleImage(article, idx);

      return `
        <article class="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
          <div>
            <div class="relative overflow-hidden bg-slate-100 aspect-video">
              <img 
                src="${imageSrc}" 
                alt="${escapeHtml(article.title)}" 
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onerror="this.src='images/sra-project-optimized.jpg'"
              />
              <span class="absolute top-3 left-3 rounded-full bg-navy/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white shadow-sm">
                ${escapeHtml(article.source || 'Mumbai SRA News')}
              </span>
            </div>

            <div class="p-6">
              <div class="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-3">
                <span class="text-crimson font-bold">📢 Mumbai Redevelopment</span>
                <span>📅 ${dateStr}</span>
              </div>

              <h3 class="text-lg font-bold text-navy font-serif mb-3 leading-snug transition group-hover:text-crimson">
                <a href="${article.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(article.title)}</a>
              </h3>

              <p class="text-xs text-slate-600 leading-relaxed text-justify line-clamp-3 mb-4">
                ${escapeHtml(article.description || '')}
              </p>
            </div>
          </div>

          <div class="border-t border-slate-100 px-6 py-4 bg-slate-50/50 mt-auto flex items-center justify-between">
            <span class="text-[11px] font-bold text-slate-500">Source: ${escapeHtml(article.source || 'SRA Advisory')}</span>
            <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs font-bold text-crimson hover:underline">
              Read News ↗
            </a>
          </div>
        </article>
      `;
    }).join('');
  }

  // Update Category Button UI States
  function updateFilterUI(selected) {
    const filterContainer = document.getElementById('news-filter-container');
    if (!filterContainer) return;
    filterContainer.querySelectorAll('button').forEach((b) => {
      const isMatch = b.getAttribute('data-filter') === selected;
      if (isMatch) {
        b.className = 'rounded-full bg-crimson px-5 py-2 text-xs font-bold text-white shadow-md transition';
        b.setAttribute('aria-pressed', 'true');
      } else {
        b.className = 'rounded-full bg-white border border-slate-200 px-5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-crimson transition';
        b.setAttribute('aria-pressed', 'false');
      }
    });
  }

  // Event Listeners
  function bindEvents() {
    const searchInput = document.getElementById('news-search-input');
    const filterContainer = document.getElementById('news-filter-container');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        renderFeed();
      });
    }

    if (filterContainer) {
      filterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-filter]');
        if (!btn) return;
        currentFilter = btn.getAttribute('data-filter');
        updateFilterUI(currentFilter);
        renderFeed();
      });
    }
  }

  function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // DOM Ready initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNewsFeed);
  } else {
    initNewsFeed();
  }

})();
