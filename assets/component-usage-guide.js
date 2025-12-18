const gridGuides = document.querySelector(".usage-guides__grid");
["DOMContentLoaded", "resize"].forEach( itemEvent  => window.addEventListener(itemEvent, initSliderGuides))

function initSliderGuides() {
  const isSwiperGlobal = typeof window.Swiper !== "undefined";
  const isSmallScreen = window.innerWidth < 768;
  isSwiperGlobal && isSmallScreen && !gridGuides.swiper
    ? initializeSwiperGuides()
    : destroySwiperGuides();
}

function initializeSwiperGuides() {
  return new Swiper(gridGuides, {
    slidesPerView: 1.35,
    spaceBetween: 24,
    grabCursor: true,
    centeredSlides: false,
    watchSlidesProgress: true,
    scrollbar: {
        el: '.grid-guides__scrollbar',
    }
  });
}

function destroySwiperGuides() {
  if (gridGuides.swiper && window.innerWidth > 768) {
    gridGuides.swiper.destroy(true, true);
  }
}
