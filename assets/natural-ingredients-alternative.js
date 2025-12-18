document.addEventListener('DOMContentLoaded', function () {

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
  const popupContainers = document.querySelectorAll('.ingredients-popup__content');
  const overlayElements = document.querySelectorAll('.ingredients__popup-overlay');
  const itemElements = document.querySelectorAll('.ingredients__item');

  const loadPageContent = async (popupIndex, popupPageLink) => {
    const contentContainer = document.getElementById(`popup-content-${popupIndex}`);
    popupPageLink = contentContainer?.getAttribute('page-link');
    try {
      const response = await fetch(popupPageLink);

      if (!response.ok) {
        throw new Error('Failed to load page');
      }

      const pageHTML = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(pageHTML, 'text/html');

      const mainContent = doc.querySelector('#MainContent');

      if (!mainContent) {
        throw new Error('MainContent element not found');
      }

      contentContainer.innerHTML = '';
      contentContainer.appendChild(mainContent.cloneNode(true));
    } catch (error) {
      console.error('Error loading page content:', error);
    }

  };

  popupContainers.forEach((popupContainer, index) => {
    const popupPageLink = '';
    loadPageContent(index + 1, popupPageLink);
  });

  itemElements.forEach((item) => {
    item.addEventListener('click', function () {
      overlayElements.forEach((overlay) => {
        if (overlay.getAttribute('index') === item.getAttribute('index')) {
          overlay.classList.add('active');
          toggleScroll(false);
        }
      });
    });
  });

  overlayElements.forEach((overlay) => {
    overlay.addEventListener('click', function (event) {
      if (event.target === overlay || event.target.classList.contains('ingredients-popup__close-button')) {
        overlay.classList.remove('active');
        toggleScroll(true);
      }
    });
  });
}, {once: true});
