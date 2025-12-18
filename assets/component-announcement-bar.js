function updateStickyHeight() {
  const stickyBar = document.querySelector('.sticky-utility-bar');
  if (!stickyBar) return;

  document.documentElement.style.setProperty('--announcement-height',`${stickyBar.offsetHeight}px`);
}

function stickyBar() {
  const stickyBar = document.querySelector('.sticky-utility-bar')
  const headerWrapper = document.querySelector('.header-wrapper')
  if(!stickyBar && !headerWrapper) return

  updateStickyHeight()
  headerWrapper.prepend(stickyBar)
}

document.addEventListener('DOMContentLoaded', () => {
  stickyBar()
  window.addEventListener('resize', updateStickyHeight);
})