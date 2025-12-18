document.addEventListener('DOMContentLoaded', function () {
    if (typeof window.Swiper != 'undefined') {
        const benefitsMarqueeWrapper = document.querySelector('.benefits-marquee__slider.swiper');
        const benefitsMarqueeSlidesNumber = benefitsMarqueeWrapper?.querySelectorAll('.benefits-marquee__text')?.length;
        let benefitsMarqueeSettings = {}

        if (window.innerWidth >= 850 || benefitsMarqueeWrapper.dataset.autoscroll !== "true") {
            benefitsMarqueeSettings = {
                watchSlidesProgress: true,
                slidesPerView: "auto",
                spaceBetween: 80,
                grabCursor: false,
                centeredSlides: false,
                freeMode: true,
                mousewheel: {
                    enabled: true,
                },
            }
        } else {
            benefitsMarqueeSettings = {
                spaceBetween: 40,
                watchSlidesProgress: true,
                grabCursor: false,
                centeredSlides: true,
                speed: 5000,
                autoplay: {
                    delay: 1,
                },
                slidesPerView: 'auto',
                loop: true,
                allowTouchMove: false,
            }
        }

        const benefitsMarqueeSlider = new Swiper('.benefits-marquee__slider.swiper', benefitsMarqueeSettings);
    }
}, {once: true});