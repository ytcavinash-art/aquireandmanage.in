/**
 * Automated Blog Fetching and Dynamic UI Renderer
 * Powered by ES6 Fetch API and A&M Advisory Blog Endpoint
 */

(function () {
  'use strict';

  const EMBEDDED_BLOGS_DATABASE = [
    {
      "id": "sra-redevelopment-2026",
      "slug": "blog-sra-redevelopment.html",
      "title": "Mumbai SRA Policy 2026: Comprehensive Guide to Slum Redevelopment",
      "description": "An in-depth analysis of latest slum rehabilitation guidelines, eligibility cutoff dates, Annexure II certification, and tenant rights across MMR.",
      "author": "Dr. Manoj Harlikar",
      "authorRole": "CEO and SRA Operations Specialist",
      "authorAvatar": "images/manoj-harlikar.jpg",
      "date": "28 July 2026",
      "readTime": "5 min read",
      "category": "SRA Policy",
      "image": "images/sra-project-optimized.jpg"
    },
    {
      "id": "community-engagement",
      "slug": "blog-community-engagement.html",
      "title": "Building Trust: Community Engagement and IEC in SRA Projects",
      "description": "How Information, Education, and Communication (IEC) initiatives resolve resident queries, prevent disputes, and accelerate consensus building.",
      "author": "Srinivasan Mohan",
      "authorRole": "COO and Stakeholder Leader",
      "authorAvatar": "images/srinivasan-mohan.jpg",
      "date": "24 July 2026",
      "readTime": "4 min read",
      "category": "Community and IEC",
      "image": "images/iec-activities.jpg"
    },
    {
      "id": "regulatory-compliance",
      "slug": "blog-regulatory-compliance.html",
      "title": "Navigating Statutory Clearances: LOI, IOD and Annexure II Processing",
      "description": "Step-by-step breakdown of obtaining statutory approvals, Letter of Intent (LOI), Intimation of Disapproval (IOD), and Commencement Certificate (CC).",
      "author": "Mayilvanan Pandi",
      "authorRole": "HOD - Annexure",
      "authorAvatar": "images/mayilvanan-pandi.jpg",
      "date": "20 July 2026",
      "readTime": "6 min read",
      "category": "Compliance and Liaisoning",
      "image": "images/liaisoning-service-card.jpg"
    },
    {
      "id": "tenant-relocation-rights",
      "slug": "contact.html",
      "title": "Tenant Transit Rent Allowances and Relocation Guidelines in MMR",
      "description": "Understanding monthly transit rent disbursements, alternative transit accommodation standards, and tenant protection mechanisms during construction.",
      "author": "A&M Advisory Research",
      "authorRole": "Urban Policy Desk",
      "authorAvatar": "images/am-logo.png",
      "date": "15 July 2026",
      "readTime": "4 min read",
      "category": "Tenant Rights",
      "image": "images/tenant-management-service-card.jpg"
    },
    {
      "id": "post-handover-facility-management",
      "slug": "facility-management.html",
      "title": "Post-Handover Facility Management for Rehabilitation Towers",
      "description": "Best practices for lift maintenance, security, water supply coordination, and Cooperative Housing Society formation after unit possession.",
      "author": "A&M Advisory Operations",
      "authorRole": "Facility Management Team",
      "authorAvatar": "images/am-logo.png",
      "date": "10 July 2026",
      "readTime": "5 min read",
      "category": "Facility Management",
      "image": "images/facility-management.jpg"
    },
    {
      "id": "developer-tenant-alignment",
      "slug": "contact.html",
      "title": "Bridging Developer-Resident Expectations in High-Density Projects",
      "description": "Strategies for developers and housing societies to maintain harmony, meet execution timelines, and avoid costly litigation.",
      "author": "Dr. Manoj Harlikar",
      "authorRole": "CEO",
      "authorAvatar": "images/manoj-harlikar.jpg",
      "date": "05 July 2026",
      "readTime": "5 min read",
      "category": "SRA Policy",
      "image": "images/recent-project-1.jpg"
    }
  ];

  let allBlogs = [...EMBEDDED_BLOGS_DATABASE];
  let currentCategory = 'All';
  let searchQuery = '';

  // Initialize Blog App
  async function initBlogs() {
    const gridContainer = document.getElementById('blogs-grid-container');
    const homeContainer = document.getElementById('latest-blogs-home-container');

    if (!gridContainer && !homeContainer) return;

    try {
      let response = await fetch('/api/blogs');
      if (response.ok) {
        const data = await response.json();
        if (data.blogs && data.blogs.length > 0) {
          allBlogs = data.blogs;
        }
      }
    } catch (err) {
      console.log('Using embedded blog database (offline/local mode).');
    } finally {
      renderCategories();
      renderBlogs();
      bindEvents();
    }
  }

  // Filter Blogs based on Search Query and Category
  function getFilteredBlogs() {
    return allBlogs.filter((blog) => {
      const matchesCategory = currentCategory === 'All' || blog.category.toLowerCase() === currentCategory.toLowerCase();
      const matchesQuery = !searchQuery || 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }

  // Render Category Tabs
  function renderCategories() {
    const categoryFilters = document.getElementById('blog-category-filters');
    if (!categoryFilters) return;

    const categories = ['All', ...new Set(allBlogs.map((b) => b.category))];

    categoryFilters.innerHTML = categories.map((cat) => {
      const isActive = cat === currentCategory;
      return `
        <button type="button" data-category="${cat}" class="blog-cat-btn rounded-full px-5 py-2 text-xs font-bold transition-all ${
          isActive 
            ? 'bg-crimson text-white shadow-md' 
            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-crimson'
        }">
          ${cat}
        </button>
      `;
    }).join('');

    categoryFilters.querySelectorAll('.blog-cat-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        currentCategory = btn.getAttribute('data-category');
        renderCategories();
        renderBlogs();
      });
    });
  }

  // Render Blog Cards HTML
  function createBlogCardHTML(blog) {
    return `
      <article class="group h-full flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
        <div class="flex-1 flex flex-col mb-2">
          <div class="relative mb-4 overflow-hidden rounded-xl bg-slate-100 aspect-video shrink-0">
            <img 
              src="${blog.image}" 
              alt="${escapeHtml(blog.title)}" 
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onerror="this.src='images/sra-project-optimized.jpg'"
            />
            <span class="absolute top-3 left-3 rounded-full bg-navy/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white shadow-sm">
              ${escapeHtml(blog.category)}
            </span>
          </div>

          <div class="flex items-center gap-2.5 text-[11px] text-slate-500 font-medium mb-2">
            <span>📅 ${escapeHtml(blog.date)}</span>
            <span>•</span>
            <span>⏱️ ${escapeHtml(blog.readTime || '4 min read')}</span>
          </div>

          <h3 class="mb-2 text-base sm:text-lg font-bold leading-snug text-navy font-serif transition group-hover:text-crimson line-clamp-2">
            <a href="${blog.slug}">${escapeHtml(blog.title)}</a>
          </h3>

          <p class="mb-3 text-xs text-slate-600 leading-relaxed text-justify line-clamp-3 flex-1">
            ${escapeHtml(blog.description)}
          </p>
        </div>

        <div class="flex items-center justify-between border-t border-slate-100 pt-3.5 mt-auto shrink-0">
          <div class="flex items-center gap-2.5">
            <img src="${blog.authorAvatar}" alt="${escapeHtml(blog.author)}" class="h-8 w-8 rounded-full object-cover border border-slate-200" onerror="this.src='images/am-logo.png'" />
            <div>
              <p class="text-xs font-bold text-navy leading-tight">${escapeHtml(blog.author)}</p>
              <p class="text-[10px] text-slate-500">${escapeHtml(blog.authorRole || 'Author')}</p>
            </div>
          </div>
          <a href="${blog.slug}" class="inline-flex items-center gap-1 text-xs font-bold text-crimson hover:underline shrink-0">
            Read Article &rarr;
          </a>
        </div>
      </article>
    `;
  }

  function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Main Render Function
  function renderBlogs() {
    const gridContainer = document.getElementById('blogs-grid-container');
    const homeContainer = document.getElementById('latest-blogs-home-container');
    const totalCountEl = document.getElementById('blog-total-count');
    const searchInput = document.getElementById('blog-search-input');

    const filtered = getFilteredBlogs();

    if (totalCountEl) {
      totalCountEl.textContent = `${filtered.length} Articles`;
    }

    // Render Grid on blog.html
    if (gridContainer) {
      if (filtered.length === 0) {
        gridContainer.innerHTML = `
          <div class="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200">
            <p class="text-base font-bold text-navy">No blog articles found</p>
            <p class="text-xs text-slate-500 mt-1">Try adjusting your search query or selected category filter.</p>
            <button id="reset-blog-filter" class="mt-4 rounded-xl bg-navy px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-crimson">Clear Filters</button>
          </div>
        `;
        document.getElementById('reset-blog-filter')?.addEventListener('click', () => {
          currentCategory = 'All';
          searchQuery = '';
          if (searchInput) searchInput.value = '';
          renderCategories();
          renderBlogs();
        });
      } else {
        gridContainer.innerHTML = filtered.map(createBlogCardHTML).join('');
      }
    }

    // Render Home Showcase on index.html (Top 3)
    if (homeContainer) {
      const topBlogs = filtered.slice(0, 3);
      homeContainer.innerHTML = topBlogs.map(createBlogCardHTML).join('');
    }
  }

  // Bind Search and Event Listeners
  function bindEvents() {
    const searchInput = document.getElementById('blog-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderBlogs();
      });
    }
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogs);
  } else {
    initBlogs();
  }

})();
