document.addEventListener("DOMContentLoaded", () => {
    class LightBox extends HTMLElement {
        static SLIDER_TYPES = ["main", "thumb"];
        static hasInsertedImages = false;

        constructor() {
            super();

            this.triggerInsideElements = [...this.querySelectorAll(".lightbox-close, .lightbox-overlay")];
            

            const currentElement = document.querySelector(`.landing-product-offer-v2__media[data-id="${this.dataset.id}"]`);
            this.triggerOutsideElements = [...currentElement.querySelectorAll(".offer-v2-media-main__slide")];
            this.templates = {
                main: this.querySelector("template#main-images"),
                thumb: this.querySelector("template#thumb-images"),
            };

            this.containers = {
                main: this.querySelector(".lightbox-main__swiper"),
                thumb: this.querySelector(".lightbox-thumb__swiper"),
            };

            this.configs = {
                main: this.parseConfig(this.dataset.mainSlider),
                thumb: this.parseConfig(this.dataset.thumbSlider),
            };

            this.sliders = {
                main: null,
                thumb: null
            };

            this.currentSlideDisplay = null;
            this.hasInsertedImages = false;
        }

        connectedCallback() {
            [...this.triggerInsideElements, ...this.triggerOutsideElements].forEach(element => {
                element.addEventListener("click", this.toggleBox.bind(this, element))
            });
        }

        toggleBox(element) {
            if (!this.isTouchDevice()) return;

            this.insertContentIfNeeded();
            const isActive = this.classList.contains("lightbox--active");
            this.classList.toggle("lightbox--active", !isActive);
            document.body.classList.toggle("overflow-hidden", !isActive);

            if (!this.hasSlider()) return;

            if (this.triggerOutsideElements.includes(element)) {
                const outsideSwiper = element.closest(".product-offer-v2-media__main");
                if (outsideSwiper && outsideSwiper.swiper) {
                    const { activeIndex } = outsideSwiper.swiper;
                    this.sliders.main?.slideTo(activeIndex, 0, true);
                }
            }
        }

        insertContentIfNeeded() {
            if (this.hasInsertedImages) return;
            console.log('INSERT?')

            this.renderImages();

            if (this.hasSlider()) {
                this.currentSlideDisplay = this.querySelector("#current-slide");
                this.initializeSliders();

                this.sliders.main?.on("slideChange", (slider) => {
                    const { activeIndex } = slider;
                    if (this.currentSlideDisplay) {
                        this.currentSlideDisplay.textContent = activeIndex + 1;
                    }
                });
            }

            this.hasInsertedImages = true;
        }

        hasSlider() {
            return this.dataset.hasSlider === "true";
        }

        parseConfig(configString) {
            try {
                return JSON.parse(configString) || {};
            } catch {
                console.warn("Failed to parse slider config:", configString);
                return {};
            }
        }

        getTemplateImages(template) {
            return template?.content.cloneNode(true).children || [];
        }

        renderImages() {
            for (const type of LightBox.SLIDER_TYPES) {
                const template = this.templates[type];
                const container = this.containers[type]?.querySelector(".lightbox-main__wrapper");

                if (template && container) {
                    const images = this.getTemplateImages(template);
                    [...images].forEach(image => container.appendChild(image));
                }
            }
        }

        initializeSliders() {
            if (typeof Swiper !== "function") {
                console.error("Swiper is not loaded.");
                return;
            }

            for (const type of LightBox.SLIDER_TYPES) {
                const container = this.containers[type];
                const config = this.configs[type];

                if (container && config) {
                    this.sliders[type] = new Swiper(container, config);
                }
            }
        }

        isTouchDevice() {
            return !window.matchMedia('(hover: hover)').matches
        }
    }

    if (!customElements.get("light-box")) {
      customElements.define("light-box", LightBox);
    }
});
