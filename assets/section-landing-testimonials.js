window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.landing-testimonials-swiper').forEach(swiperEl => {
    new Swiper(swiperEl, {
      slidesPerView: 'auto',
      loop: false,
      spaceBetween: 6,
      breakpoints: {
        750: {
          spaceBetween: 10
        }
      }
    });
  });

  document.querySelectorAll('.landing-testimonials-swiper-v3').forEach(swiperEl => {
    new Swiper(swiperEl, {
      loop: false,
      spaceBetween: 6,
      breakpoints: {
        1: {
          centeredSlides: true,
          spaceBetween: 10,
          slidesPerView: 1.42,
          initialSlide: 1
        },
        991: {
          centeredSlides: false,
          spaceBetween: 10,
          slidesPerView: 'auto'
        }
      }
    });
  });
});