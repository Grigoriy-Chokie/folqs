class landingOfferProduct extends HTMLElement {
    constructor() {
        super();

        this.discountCode = this.dataset.discountCode;
        this.variantId = this.dataset.variantId;
        this.quantity = this.dataset.quantity
        this.addToCartButton = this.querySelector('.product-card__buy-now');
    }

    connectedCallback() {
        if (!this.addToCartButton) return;
        
        this.addToCartButton.classList.remove('loading');
        this.addToCartButton.addEventListener('click', () => this.handleAddToCartClick())
    }

    async handleAddToCartClick() {
        this.addToCartButton.classList.add('loading');
        await this.clearCart()
        this.addToCart();
    }

    clearCart() {
        return fetch('/cart/clear.js')
    }

    async addToCart() {
        const bodyData = {
            'items': [{
                'id': Number(this.variantId),
                'quantity': Number(this.quantity),
            }]
        }

        const response = await fetch(window.Shopify.routes.root + 'cart/add.js', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            }
        );

        if (response.ok) {
            window.location.href = this.discountCode ? `/checkout?discount=${this.discountCode}` : '/checkout'
        }
    }
}

customElements.define('landing-offer-product', landingOfferProduct)