document.addEventListener('DOMContentLoaded', function () {

    function  toggleBodyScroll(isScrollDisabled) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = isScrollDisabled ? '' : 'hidden';
      document.body.style.paddingRight =isScrollDisabled ? '' : scrollBarWidth + 'px';
    }
    const popupContainers = document.querySelectorAll('.ingredients-popup__content');
    const overlayElements = document.querySelectorAll('.ingredients__popup-overlay');
    const itemElements = document.querySelectorAll('.ingredients__item.ingredients__item--popup');
  
    const loadPageContent = async (popupIndex) => {
      const contentContainer = document.getElementById(`popup-content-${popupIndex}`);
      popupPageLink = contentContainer?.getAttribute('page-link');
      try {
        const response = await fetch(popupPageLink);
  
        if (!response.ok) {
          throw new Error('Failed to load page');
        }
  
        const pageHTML = await response.text();
  
        const parser = new DOMParser();
        const incomingDocument = parser.parseFromString(pageHTML, 'text/html');
  
        const mainContent = incomingDocument.querySelector('#MainContent');
  
        if (!mainContent) {
          throw new Error('MainContent element not found');
        }
  
        contentContainer.appendChild(mainContent.cloneNode(true));
      } catch (error) {
        console.error('Error loading page content:', error);
      }
  
    };
  

    setTimeout(() => {
      popupContainers.forEach((popupContainer, index) => {
        loadPageContent(index + 1);
      });
    }, 1000); 
  
    itemElements.forEach((item) => {
      item.addEventListener('click', function () {
        overlayElements.forEach((overlay) => {
          if (overlay.getAttribute('index') === item.getAttribute('index')) {
            overlay.classList.add('active');
            toggleBodyScroll(false);
          }
        });
      });
    });
  
    overlayElements.forEach((overlay) => {
      overlay.addEventListener('click', function (event) {
        if (event.target === overlay || event.target.classList.contains('ingredients-popup__close-button') ||  event.target.closest('.ingredients-popup__close-button')) {
          overlay.classList.remove('active');
          toggleBodyScroll(true);
        }
      });
    });
  }, {once: true});
  