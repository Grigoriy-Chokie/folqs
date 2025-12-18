if (!customElements.get('product-offer-v2-media')) {
  customElements.define('product-offer-v2-media', class ProductOfferV2Media extends HTMLElement {
  constructor() {
    super();

    this.mainSlider = null
    this.mainSliderElement = this.querySelector('.offer-v2-media-main')
    this.thumbsSlider = null
    this.thumbsSliderElement = this.querySelector('.offer-v2-media-thumbs')
    this.pagination = this.querySelector(".offer-v2-media-main__pagination--bullets")
    this.paginationFraction = this.querySelector(".offer-v2-media-main__pagination--fraction")
  }

  connectedCallback() {
    if (!this.thumbsSlider) {
      this.thumbsSlider = new Swiper(this.thumbsSliderElement, {
        spaceBetween: 8,
        slidesPerView: 5,

        breakpoints: {
          750: {
            spaceBetween: 10
          },
        }
      })
    }

    if (!this.mainSlider) {
      let config =  {
        spaceBetween: 0,
        navigation: {
          nextEl: ".product-offer-v2-media__navigation--next",
          prevEl: ".product-offer-v2-media__navigation--prev",
        },
        thumbs: {
          swiper: this.thumbsSlider,
        },
      }

      if (this.pagination) {
        config.pagination = {
          el: this.pagination,
          type: "bullets",
          clickable: true
        }
      }

      this.mainSlider = new Swiper(this.mainSliderElement, config)

      this.updateFractionPagination(this.mainSlider);
      this.mainSlider.on('slideChange', () => {
        this.updateFractionPagination(this.mainSlider);
      });
    }
  }

  updateFractionPagination(swiper) {
    if(!this.paginationFraction) return

    const totalSlides = swiper.slides.length;
    const currentSlide = swiper.realIndex + 1;

    this.paginationFraction.innerText = `${currentSlide}/${totalSlides}`
  }
}
)}