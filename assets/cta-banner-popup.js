function deactivatePopup(event) {
    var currentTarget = event.currentTarget;
    var target = event.target;

    if (target !== currentTarget && !currentTarget.classList.contains('popup__close-button') && currentTarget.contains(target)) {
      return;
    }
    if (!currentTarget.classList.contains('popup__close-button')){
      currentTarget.classList.remove('cta-banner__popup-overlay--active');
      currentTarget.classList.remove('formula__popup-overlay--active');
      currentTarget.classList.remove('ingredients__popup-overlay--active');
    } else {
      currentTarget.closest('.cta-banner__popup-overlay')?.classList.remove('cta-banner__popup-overlay--active');
      currentTarget.closest('.formula__popup-overlay')?.classList.remove('formula__popup-overlay--active');
      currentTarget.closest('.ingredients__popup-overlay')?.classList.remove('ingredients__popup-overlay--active');
    }
    toggleScroll(true);
  }

  function activatePopup(element) {
    if (element) {
      element.querySelector('.cta-banner__popup-overlay')?.classList.add('cta-banner__popup-overlay--active');
      element.querySelector('.formula__popup-overlay')?.classList.add('formula__popup-overlay--active');
      element.querySelector('.ingredients__popup-overlay')?.classList.add('ingredients__popup-overlay--active');
      toggleScroll(false);
    }
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

  function handlePopupChanges(event){
      event.target.closest('.cta-banner__popup')?.querySelectorAll('[data-metaobject-handle]').forEach(popup => {
        popup.classList.toggle('hidden', popup.dataset.metaobjectHandle !== event.target.value)
    })
  }