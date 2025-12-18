class StickyAddCart extends HTMLElement {
  constructor() {
    super();

    this.options = this.querySelectorAll('.sticky-add-cart__option');
    this.sellingPlanInput = this.querySelector('input[name="selling_plan"]');
    this.sellingPlanId = this.sellingPlanInput.value;
    this.buttonText = this.querySelector('button.product-form__submit > span');
    this.originalSubmitButton = document.querySelector('.product-information__buy-buttons');
    this.productSectionWrapper = document.querySelector('#landing-product');
    this.stickyAddToCartAnchor = this.querySelector('.sticky-add-cart__anchor');
    this.giftSubscriptionItem = document.querySelector('.sticky-add-cart__option[has-gift]')
  }

  connectedCallback() {

    if(this.giftSubscriptionItem) this.checkGiftProductFromSubscription()

    this.options.forEach(option => {
      option.addEventListener('click', () => {
        if (option.dataset.value == 'one-time') {
          this.sellingPlanInput?.setAttribute('disabled', true);
          this.buttonText.innerHTML = this.dataset.onetimeButtonText;
        } else {
          this.sellingPlanInput?.removeAttribute('disabled');
          this.buttonText.innerHTML = this.dataset.subscribeButtonText;
        }
      })
    })

    this.stickyAddToCartAnchor?.addEventListener('click', () => {
      const productFormButtonSubmit = document.querySelector('.product-form__buttons button[type="submit"]')
      if (productFormButtonSubmit) productFormButtonSubmit.click();
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          this.classList.toggle('sticky-add-cart--hidden', entry.isIntersecting);
        });
      },
      {
        root: null,
        threshold: 0.1
      }
    );

    observer.observe(this.productSectionWrapper);
  }

  checkGiftProductFromSubscription() {
      const subscriptionWidget = document.querySelector('.sticky-add-cart__form-container')
      if (!subscriptionWidget) return

      const variantInputId = this.querySelector('input[name="id"]')
      const giftVariantInputId = this.querySelector('.gift-variant-id')
      const sellingPlan = document.querySelector('.sticky-add-cart__form-container input[name*="selling_plan"]')
      if (!giftVariantInputId || !sellingPlan) return

      const toggleInputs = () => {
        if (this.querySelector('input[has-gift]').checked) {
          variantInputId.name = 'items[0][id]'
          giftVariantInputId.disabled = false
          sellingPlan.name = 'items[0][selling_plan]'
        } else {
          variantInputId.name = 'id'
          variantInputId.disabled = false
          giftVariantInputId.disabled = true
          sellingPlan.name = 'selling_plan'
        }
      }

      toggleInputs()

      subscriptionWidget.addEventListener('change', () => {
        toggleInputs()
      })
  }
}

if(!customElements.get('sticky-add-cart')) {
  customElements.define('sticky-add-cart', StickyAddCart);
}