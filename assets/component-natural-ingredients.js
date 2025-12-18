const arrayEvents = ["DOMContentLoaded", "resize"];
const gridIngredients = document.querySelector(".grid-ingredients");

arrayEvents.forEach( itemEvent  => window.addEventListener(itemEvent, initSlider))

function initSlider() {
  const isSwiperGlobal = typeof window.Swiper !== "undefined";
  const isSmallScreen = window.innerWidth < 768;
  isSwiperGlobal && isSmallScreen && !gridIngredients.swiper
    ? initializeSwiper()
    : destroySwiper();
}

function initializeSwiper() {
  return new Swiper(gridIngredients, {
    slidesPerView: 1.55,
    spaceBetween: 20,
    grabCursor: true,
    centeredSlides: false,
    watchSlidesProgress: true,
  });
}

function destroySwiper() {
  if (gridIngredients.swiper && window.innerWidth > 768) {
    gridIngredients.swiper.destroy(true, true);
  }
}
