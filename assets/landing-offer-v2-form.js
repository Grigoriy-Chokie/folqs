class LandingOfferV2Form extends HTMLElement {
  constructor() {
    super();

    this.rootElement = this.closest('.landing-product-offer-v2__container');
    this.sellingPlanButtons = this.querySelectorAll('.product-offer-v2-selling-plan__button');
    this.mediaOptionBadges = Array.from(this.rootElement.querySelectorAll('.product-offer-v2-media__badge'));
    this.sendFormButton = this.querySelector('.product-offer-v2-form__button');

    this.oneTimePurchaseOptions = Array.from(this.querySelectorAll('.product-offer-v2-options--one-time .product-offer-v2-options__option'));
    this.subscribeOptions = Array.from(this.querySelectorAll('.product-offer-v2-options--subscribe .product-offer-v2-options__option'));
    this.allQuantityOptions = this.querySelectorAll('.product-offer-v2-options__option');
    this.activeOptionIndex = 1;

    this.productForm = this.querySelector('.product-offer-v2-form');
    this.sellingPlanInput = this.querySelector('input[name="selling_plan"]');
    this.quantityInput = this.querySelector('input[name="quantity"]');
    this.discountCode = '';

  }

  connectedCallback() {
    this.sendFormButton.classList.remove('loading');
    this.changeFormDataByOption(this.getDefaultActiveOption());

    this.productForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleAddToCartClick();
    })

    this.sellingPlanButtons.forEach(button => {
      button.addEventListener('click', this.changeSellingPlan.bind(this));
    })

    this.allQuantityOptions.forEach(option => {
      option.addEventListener('click', this.changeQuantityOption.bind(this));
    })
  }

  changeSellingPlan(event) {
    this.sellingPlanButtons.forEach(button => {
      button.classList.remove('product-offer-v2-selling-plan__button--active');
    });

    if (event.target.id === 'product-offer-v2-one-time')
    {
      this.rootElement?.setAttribute('data-selling-plan', 'one-time');
      event.target.classList.add('product-offer-v2-selling-plan__button--active');
      this.sellingPlanInput?.setAttribute('disabled', true);

      // Change quantity and discount-code if subscribe options different with one-time-purchase options
      const activeOption = this.oneTimePurchaseOptions.find(option => option.classList.contains('product-offer-v2-options__option--active'))
      this.changeFormDataByOption(activeOption);
    }
    else if (event.target.id === 'product-offer-v2-subscribe')
    {
      this.rootElement?.setAttribute('data-selling-plan', 'subscribe');
      event.target.classList.add('product-offer-v2-selling-plan__button--active');
      this.sellingPlanInput?.removeAttribute('disabled');

      // Change quantity if subscribe options different with one-time-purchase options
      const activeOption = this.subscribeOptions.find(option => option.classList.contains('product-offer-v2-options__option--active'))
      this.changeFormDataByOption(activeOption);
      this.changeMediaBadgesByOption(activeOption);
    }


  }

  changeQuantityOption(event) {
    const activeOption = event.target.closest('.product-offer-v2-options__option');

    // delete active classes
    this.allQuantityOptions.forEach(option => {
      option.classList.remove('product-offer-v2-options__option--active');
    })

    // add active classes on subscribe and one-time options
    activeOption.classList.add('product-offer-v2-options__option--active')
    const activeOptionIndex = +activeOption.dataset.index;
    if (this.rootElement.dataset.sellingPlan === 'one-time')
    {
      this.activeOptionIndex = Math.min(activeOptionIndex, (this.subscribeOptions.length - 1));
      this.subscribeOptions[this.activeOptionIndex]?.classList.add('product-offer-v2-options__option--active');
    }
    else if (this.rootElement.dataset.sellingPlan === 'subscribe')
    {
      this.activeOptionIndex = Math.min(activeOptionIndex, (this.oneTimePurchaseOptions.length - 1));
      this.oneTimePurchaseOptions[this.activeOptionIndex]?.classList.add('product-offer-v2-options__option--active');
    }

    // change quantity and discount code inputs value
    this.changeFormDataByOption(activeOption);
    // change badges above image
    this.changeMediaBadgesByOption(activeOption);
  }

  getDefaultActiveOption() {
    if (this.rootElement.dataset.sellingPlan == 'one-time')
    {
      return this.oneTimePurchaseOptions.find(option => option.classList.contains('product-offer-v2-options__option--active'));
    }
    else if (this.rootElement.dataset.sellingPlan == 'subscribe')
    {
      return this.subscribeOptions.find(option => option.classList.contains('product-offer-v2-options__option--active'));
    }
  }

  changeFormDataByOption(activeOption) {
    this.quantityInput.value = activeOption.dataset.quantity;
    this.discountCode = activeOption.dataset.discountCode;
  }

  changeMediaBadgesByOption(activeOption) {
    this.mediaOptionBadges.forEach(badge => {
      badge.style.display = 'none'
    })
    let activeOptionBadgeId = '';

    if (this.rootElement.dataset.sellingPlan === 'one-time')
    {
      activeOptionBadgeId = `badge-one-time-${activeOption.dataset.quantity}`;
    }
    else if (this.rootElement.dataset.sellingPlan === 'subscribe')
    {
      activeOptionBadgeId = `badge-subscribe-${activeOption.dataset.quantity}`;
    }

    const activeBadges = this.mediaOptionBadges.filter(badge => badge.dataset.badgeId === activeOptionBadgeId);
    activeBadges.forEach(badge => badge.style.display = 'block');
  }

  async handleAddToCartClick() {
    try {
      this.sendFormButton.classList.add('loading');
      await this.clearCart()
      this.addToCart();
    }
    catch (error) {
      console.error(error);
    } finally {
      this.sendFormButton.classList.remove('loading');
    }
  }

  clearCart() {
    return fetch('/cart/clear.js');
  }

  async addToCart() {
      const formData = new FormData(this.productForm);

      const response = await fetch(window.Shopify.routes.root + 'cart/add.js',
          {
              method: 'POST',
              headers: {
                'X-Requested-With': 'XMLHttpRequest'
              },
              body: formData
          }
      );

      if (response.ok) {
        window.location.href = this.discountCode ? `/checkout?discount=${this.discountCode}` : '/checkout'
      }
    }
}

if (!customElements.get('landing-offer-v2-form')) {
  customElements.define('landing-offer-v2-form', LandingOfferV2Form)
}