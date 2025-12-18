class FaqItems extends HTMLElement {
  constructor() {
    super()

    this.faqItems = this.querySelectorAll('.faq-item');
    this.isOnlyOneOpened = this.dataset.isOnlyOneOpened == 'true' ? true : false;
  }

  connectedCallback() {
    this.addEventListener('click', this.accordionClickHandle.bind(this))
  }

  accordionClickHandle(event) {
    if (event?.target.closest('.faq-item__question')) {
      this.onQuestionClick(event?.target.closest('.faq-item'));
    }
  }

  onQuestionClick(clickedItem) {
    if (this.isOnlyOneOpened) {
      this.faqItems.forEach(faqItem => {
        if (clickedItem !== faqItem) {
          faqItem.classList.remove('faq-item--active')
        }
      })
    }

    clickedItem.classList.toggle('faq-item--active');
  }
}

if (!customElements.get('faq-items')) {
  customElements.define('faq-items', FaqItems);
}