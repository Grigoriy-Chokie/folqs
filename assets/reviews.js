(() => {
  const arrayEvents = ["DOMContentLoaded", "resize"];
  arrayEvents.forEach(itemEvent => window.addEventListener(itemEvent, () => {
    const reviewsSwiper = document.querySelector(".reviews__swiper");
    initSlider(reviewsSwiper)
  })
  );

  function initSlider(swiperElement) {
    const isSwiperGlobal = typeof window.Swiper !== "undefined";
    const isSmallScreen = window.innerWidth < 576;
  
    isSwiperGlobal && isSmallScreen ?
      initializeSwiper(swiperElement)
      :
      destroySwiper(swiperElement?.swiper)
  }

  function initializeSwiper(swiperElement) {
    if (swiperElement.swiper) return
    
    return new Swiper(swiperElement, {
      slidesPerView: 1,
      grabCursor: true,
      centeredSlides: false,
      watchSlidesProgress: true,
      spaceBetween: 20
    });
  }

  function destroySwiper(swiperElement) {
    swiperElement?.destroy(true, true);
  }
})();
