window.addEventListener('load', function () {
  let preloader = document.querySelector('.section__pre-loader');
  if (preloader) {
    toggleScroll(false);
    setTimeout(function () {

      preloader.style.transition = 'opacity .3s';
      preloader.style.opacity = 0;


      setTimeout(function () {
        toggleScroll(true);
        preloader.style.display = 'none';
      }, 1000);
    }, extraLoadingTime);
  }
  function toggleScroll(isScrollDisabled) {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (isScrollDisabled) {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    } else {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = scrollBarWidth + 'px';
    }
  }
});
