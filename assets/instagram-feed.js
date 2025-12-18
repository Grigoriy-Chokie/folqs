document.addEventListener("DOMContentLoaded", function () {
    (function initializeAllSliders() {
        const sliders = document.querySelectorAll('.instagram-feed__content');
        sliders.forEach((sliderElement) => {
            const autoplay = +sliderElement?.dataset.autoplay;
            const desktopSpaceBetween = +sliderElement?.dataset.desktopSpaceBetween;
            const mobileSpaceBetween = +sliderElement?.dataset.mobileSpaceBetween;

            const sliderSettings = {
                breakpoints: {
                    0: {
                        spaceBetween: mobileSpaceBetween,
                        slidesPerView: 1.18
                    },
                    576: {
                        spaceBetween: mobileSpaceBetween,
                        slidesPerView: 2
                    },
                    990: {
                        spaceBetween: desktopSpaceBetween,
                        slidesPerView: 3
                    },
                    1099: {
                        spaceBetween: desktopSpaceBetween,
                        slidesPerView: 4
                    }
                }
            };

            if (autoplay !== 0) {
                sliderSettings.autoplay = { delay: autoplay * 1000 };
            }

            return new Swiper(sliderElement, sliderSettings);
        });
    })();
}, {once: true});