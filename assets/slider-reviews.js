document.addEventListener("DOMContentLoaded", () => {
    const initializeAllSliders = () => {
        const sliders = document.querySelectorAll('.reviews-slider');
        sliders.forEach((sliderElement) => {
            new Swiper(sliderElement, {
                updateOnWindowResize: true,
                grabCursor: true,
                breakpoints: {
                    0: {
                        slidesPerView: 1.35,
                        spaceBetween: 14,
                    },
                    576: {
                        slidesPerView: 2.5,
                        spaceBetween: 24,
                    },
                    991: {
                        slidesPerView: 3.1,
                        spaceBetween: 24,
                    },
                    1199: {
                        spaceBetween: 24,
                        slidesPerView: 3.34,
                    }
                },

            });
        });
    }
    initializeAllSliders();
});
