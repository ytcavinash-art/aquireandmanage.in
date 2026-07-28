/**
 * A&M Advisory - Sliders & Carousels Handler
 * Lightweight vanilla JavaScript slider & marquee initialization using Swiper JS CDN or native smooth scrolling.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initProjectsSlider();
  initTestimonialsSlider();
  initServicesSlider();
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
