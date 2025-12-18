document.addEventListener('DOMContentLoaded', function () {
  const tabContainer = document.querySelector(".banner-with-tabs__padding-wrapper");
  const tabHeadings = tabContainer.querySelectorAll('.tabs__heading');
  const tabHeadingSvg = tabContainer.querySelectorAll('.progress-bar__line');
  const tabContents = tabContainer.querySelectorAll('.tab-contents__item:not(.tab-contents__item--mobile)');
  const tabContentsMobile = tabContainer.querySelectorAll('.tab-contents__item.tab-contents__item--mobile');

  const timeChangeTab = Number(tabContainer.dataset.time) || 5000;

  const maxAmountIteration = tabHeadings.length;

  let currentIteration = 1;
  let intervalId;

  if (window.innerWidth < 990) {
    removeClassFromArray(tabHeadings, "tabs__heading--active");
  }

  tabHeadings.forEach((heading, index) => heading.addEventListener('click', () => {
    activateTab(index, true);
    stopInterval();
  }));

  function startInterval() {
    if (!intervalId) {
      intervalId = setInterval(() => {
        activateTab(currentIteration, false);
        currentIteration = (currentIteration + 1) % maxAmountIteration;
      }, timeChangeTab);
    }
  }

  function stopInterval() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function activateTab(index, isClicked) {
    if (window.innerWidth >= 990) {
      removeClassFromArray(tabHeadings, "tabs__heading--active");
    }
    removeClassFromArray(tabContents, "tab-contents__item--active");
    removeClassFromArray(tabHeadingSvg, "progress-bar__line--active");
    if (window.innerWidth < 990) {
      tabContentsMobile[index].classList.toggle(
        'tab-contents__item--active',
        !tabContentsMobile[index].classList.contains('tab-contents__item--active'));
      if (tabHeadings[index].classList.contains('tabs__heading--active-mobile')) {
        tabHeadings[index].classList.remove('tabs__heading--active')
        tabHeadings[index].classList.remove('tabs__heading--active-mobile');
      } else {
        tabHeadings[index].classList.toggle(
          'tabs__heading--active',
          !tabHeadings[index].classList.contains('tabs__heading--active'))
      }

    }
    if (window.innerWidth >= 990) {
      tabHeadings[index].classList.add('tabs__heading--active');
    }
    tabContents[index].classList.add('tab-contents__item--active');
    tabHeadingSvg[index].classList.add('progress-bar__line--active');
    if (isClicked) {
      tabHeadingSvg[index].style.setProperty('--duration', '0s');
    }
    tabsSlider.slideTo(index);
    currentIteration = index;
  }

  function removeClassFromArray(array, className) {
    array.forEach(element => element.classList.remove(className));
  }
  if (window.innerWidth >= 990) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => entry.isIntersecting ? startInterval() : stopInterval());
    }, { rootMargin: '120px 0px 50px 0px' });

    observer.observe(tabContainer);
  }

  let tabsSlider = new Swiper('.banner-with-tabs__slider', {
    spaceBetween: 24,
    grabCursor: false,
    centeredSlides: false,
    slideToClickedSlide: true,
    breakpoints: {
      250: {
        slidesPerView: 'auto',
        spaceBetween: 24,
      },
      991: {
        spaceBetween: 0,
      },
    },
  });
}, {once: true});
