const accordionSections = document.querySelectorAll('.accordion__slider');

accordionSections.forEach(section => {
  const swiperElement = section.querySelector('.swiper');
  const accordionWrapper = section.querySelector('.accordion-swiper'); // wrapper that contains the Swiper
  const accordions = section.querySelectorAll('.accordion__trigger');

  let isManualClick = false; // flag to prevent double triggering during manual clicks

  const accordionSwiper = new Swiper(swiperElement, {
    slidesPerView: 1,
    spaceBetween: 10,
    speed: 400,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  // Accordion click handler
  accordions.forEach((trigger, index) => {
    trigger.addEventListener('click', () => {
      // Temporarily block the slider while the logic executes
      accordionWrapper.style.pointerEvents = 'none';

      isManualClick = true;

      // Close all other accordions except the clicked one
      accordions.forEach((innerTrigger, innerIndex) => {
        if (innerIndex !== index && innerTrigger.parentNode.classList.contains('open')) {
          innerTrigger.click(); // trigger global slideToggle
        }
      });

      // Move the Swiper to the corresponding slide
      accordionSwiper.slideTo(index);

      // Release the block and reset the flag after 500ms
      setTimeout(() => {
        isManualClick = false;
        accordionWrapper.style.pointerEvents = '';
      }, 500);
    });
  });

  // Swiper slide change handler
  accordionSwiper.on('slideChange', function () {
    // Ignore if the change was triggered by a manual click
    if (isManualClick) return;

    const index = this.realIndex;

    // Temporarily block the slider
    accordionWrapper.style.pointerEvents = 'none';

    // Close all other accordions
    accordions.forEach((trigger, i) => {
      if (trigger.parentNode.classList.contains('open') && i !== index) {
        trigger.click(); // trigger global slideToggle
      }
    });

    // Open the accordion corresponding to the current slide
    const activeTrigger = accordions[index];
    if (activeTrigger && !activeTrigger.parentNode.classList.contains('open')) {
      activeTrigger.click(); // trigger global slideToggle
    }

    // Release the block after 200ms
    setTimeout(() => {
      accordionWrapper.style.pointerEvents = '';
    }, 500);
  });
});
