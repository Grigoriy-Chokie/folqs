if (!customElements.get('product-form')) {
  customElements.define(
    'product-form',
    class ProductForm extends HTMLElement {
      constructor() {
        super();

        this.form = this.querySelector('form');
        this.form.querySelector('input.product-variant-id').disabled = false;
        this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
        this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
        this.submitButton = this.querySelector('[type="submit"]');
        this.currentPrice = this.setCurrentPrice();
        this._discountCode = this.dataset.discountCode || null; 

        this.giftSubscriptionItem = document.querySelector('.product-information__selling-plan-wrapper[has-gift]')
        
        if(this.giftSubscriptionItem) this.checkGiftProductFromSubscription() 


        if (document.querySelector('cart-drawer')) this.submitButton.setAttribute('aria-haspopup', 'dialog');

        this.hideErrors = this.dataset.hideErrors === 'true';
      }

      get discountCode() {
        return this._discountCode;
      }

      set discountCode(value) {
        this._discountCode = value;
      }

      setCurrentPrice() {
        const sellingPlansWrapper = this.closest('.landing-product__information')?.querySelector('.product-information__selling-plans-wrapper')
        this.currentPrice = sellingPlansWrapper?.querySelector('input[type="radio"][data-price]:checked')?.dataset.price;
      }

      checkGiftProductFromSubscription() {
        const subscriptionWidget = document.querySelector('.product-information__selling-plans-wrapper')
        if (!subscriptionWidget) return
        
        const variantInputId = this.querySelector('input[name="id"]')
        const giftVariantInputs = this.form.querySelectorAll('.gift-variant-id');
        const sellingPlan = document.querySelector('.product-information__buy-buttons input[name*="selling_plan"]')
        const quantityInput = document.querySelector('quantity-input .buy-quantity__input')
        const giftQuantityInput = document.querySelectorAll('quantity-input .gift-quantity__input')
        if (!giftVariantInputs.length || !sellingPlan) return

        const toggleInputs = () => {
          if (this.giftSubscriptionItem.classList.contains('active')) {
            if(quantityInput) quantityInput.name = 'items[0][quantity]'
            giftQuantityInput.forEach(input => input.disabled = false)
            if(variantInputId) variantInputId.name = 'items[0][id]'
            giftVariantInputs.forEach(input => input.disabled = false)
            sellingPlan.name = 'items[0][selling_plan]'
          } else {
            if(quantityInput) quantityInput.name = 'quantity'
            giftQuantityInput.forEach(input => input.disabled = true)
            if(variantInputId) variantInputId.name = 'id'
            if(variantInputId) variantInputId.disabled = false
            giftVariantInputs.forEach(input => input.disabled = true)
            sellingPlan.name = 'selling_plan'
          }
        }

        toggleInputs()

        subscriptionWidget.addEventListener('change', () => {
          toggleInputs()
        })
      }

      pushATCEventToDataLayer() {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "add_to_cart",
          value: this.currentPrice,
          currency: Shopify.currency.active
        });
      }

      checkTheChildProductForSellingPlan(formData) {

        const sellingPlan = formData.get('items[0][selling_plan]');
        if (!sellingPlan) return;
      
        let itemIdCount = 1

        const parent_id = formData.get('items[0][id]')
        for (const key of formData.keys()) {
          const match = key.match(/^items\[(\d+)\]\[id\]$/);
          if (match) {
            const index = Number(match[1]);
            if (index === 0) continue;
            itemIdCount++;
            formData.append(`items[${index}][parent_id]`, parent_id);
          }
        }

      }

      onSubmitHandler(evt) {
        evt.preventDefault();
        this.setCurrentPrice();

        if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

        this.handleErrorMessage();

        this.submitButton.setAttribute('aria-disabled', true);
        this.submitButton.classList.add('loading');
        this.querySelector('.loading__spinner').classList.remove('hidden');

        const config = fetchConfig('javascript');
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        delete config.headers['Content-Type'];

        const formData = new FormData(this.form);
        if (this.cart) {
          formData.append(
            'sections',
            this.cart.getSectionsToRender().map((section) => section.id)
          );
          formData.append('sections_url', window.location.pathname);
          this.cart.setActiveElement(document.activeElement);
        }

        this.checkTheChildProductForSellingPlan(formData)

        config.body = formData;

        if (this.currentPrice) this.pushATCEventToDataLayer();

        fetch(`${routes.cart_clear_url}.js`)
        .then(res => {
          fetch(`${routes.cart_add_url}`, config)
          .then((response) => response.json())
          .then((response) => {
            if (response.status) {
              publish(PUB_SUB_EVENTS.cartError, {
                source: 'product-form',
                productVariantId: formData.get('id'),
                errors: response.errors || response.description,
                message: response.message,
              });
              this.handleErrorMessage(response.description);

              const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
              if (!soldOutMessage) return;
              this.submitButton.setAttribute('aria-disabled', true);
              this.submitButton.querySelector('span').classList.add('hidden');
              soldOutMessage.classList.remove('hidden');
              this.error = true;
              return;
            } else if (!this.cart) {
              window.location.href = `${window.routes.checkout_url}${this._discountCode ? `?discount=${this._discountCode}` : ''}`;
              return;
            }

            if (!this.error)
              publish(PUB_SUB_EVENTS.cartUpdate, {
                source: 'product-form',
                productVariantId: formData.get('id'),
                cartData: response,
              });
            this.error = false;
            const quickAddModal = this.closest('quick-add-modal');
            if (quickAddModal) {
              document.body.addEventListener(
                'modalClosed',
                () => {
                  setTimeout(() => {
                    this.cart.renderContents(response);
                  });
                },
                { once: true }
              );
              quickAddModal.hide(true);
            } else {
              this.cart.renderContents(response);
            }
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            if (this.cart) {
              this.submitButton.classList.remove('loading');
              if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
              if (!this.error) this.submitButton.removeAttribute('aria-disabled');
              this.querySelector('.loading__spinner').classList.add('hidden');
            }
          })
        })
      }

      handleErrorMessage(errorMessage = false) {
        if (this.hideErrors) return;

        this.errorMessageWrapper =
          this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
        if (!this.errorMessageWrapper) return;
        this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

        this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

        if (errorMessage) {
          this.errorMessage.textContent = errorMessage;
        }
      }
    }
  );
}