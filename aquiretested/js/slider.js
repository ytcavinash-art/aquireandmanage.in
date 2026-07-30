/**
 * A&M Advisory - Sliders & Carousels Handler
 * Lightweight vanilla JavaScript slider & marquee initialization using Swiper JS CDN or native smooth scrolling.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initProjectsSlider();
  initTestimonialsSlider();
  initServicesSlider();
  initBulletinBoards();
});

/* Hero Banner Carousel */
function initHeroSlider() {
  if (typeof Swiper !== 'undefined' && document.querySelector('.hero-swiper')) {
    new Swiper('.hero-swiper', {
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      effect: 'fade',
      fadeEffect: { crossFade: true }
    });
  }
}

/* Orders, circulars and news vertical tickers */
function initBulletinBoards() {
  document.querySelectorAll('[data-bulletin-board]').forEach((board) => {
    const track = board.querySelector('.bulletin-track');
    const previousButton = board.querySelector('[data-bulletin-prev]');
    const nextButton = board.querySelector('[data-bulletin-next]');
    const pauseButton = board.querySelector('[data-bulletin-pause]');
    const pauseIcon = board.querySelector('[data-pause-icon]');
    let currentIndex = 0;
    let paused = false;
    let rotationTimer;

    const render = () => {
      const entryHeight = board.querySelector('.bulletin-entry')?.offsetHeight || 105;
      track.style.transform = `translateY(-${currentIndex * entryHeight}px)`;
    };

    const move = (direction) => {
      const lastIndex = Math.max(0, board.querySelectorAll('.bulletin-entry').length - 2);
      currentIndex = direction > 0
        ? (currentIndex >= lastIndex ? 0 : currentIndex + 1)
        : (currentIndex <= 0 ? lastIndex : currentIndex - 1);
      render();
    };

    const stopRotation = () => {
      window.clearInterval(rotationTimer);
    };

    const startRotation = () => {
      stopRotation();
      const lastIndex = Math.max(0, board.querySelectorAll('.bulletin-entry').length - 2);
      if (!paused && lastIndex > 0) {
        rotationTimer = window.setInterval(() => move(1), 3500);
      }
    };

    previousButton?.addEventListener('click', () => {
      move(-1);
      startRotation();
    });

    nextButton?.addEventListener('click', () => {
      move(1);
      startRotation();
    });

    pauseButton?.addEventListener('click', () => {
      paused = !paused;
      pauseButton.setAttribute('aria-pressed', String(paused));
      pauseButton.setAttribute('aria-label', paused ? 'Resume rotation' : 'Pause rotation');
      pauseIcon.textContent = paused ? '▶' : 'Ⅱ';
      startRotation();
    });

    board.addEventListener('focusin', stopRotation);
    board.addEventListener('focusout', startRotation);
    board.addEventListener('bulletin:updated', () => {
      currentIndex = 0;
      render();
      startRotation();
    });

    render();
    startRotation();
  });
}

/* Recent Projects Carousel */
function initProjectsSlider() {
  if (typeof Swiper !== 'undefined' && document.querySelector('.projects-swiper')) {
    new Swiper('.projects-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 4000 },
      pagination: { el: '.projects-pagination', clickable: true },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }
}

/* Testimonials / Reviews Carousel */
function initTestimonialsSlider() {
  if (typeof Swiper !== 'undefined' && document.querySelector('.testimonials-swiper')) {
    new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 4500 },
      pagination: { el: '.testimonials-pagination', clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 }
      }
    });
  }
}

/* Service Solutions Slider */
function initServicesSlider() {
  if (typeof Swiper !== 'undefined' && document.querySelector('.services-swiper')) {
    new Swiper('.services-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: { el: '.services-pagination', clickable: true },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 }
      }
    });
  }
}
