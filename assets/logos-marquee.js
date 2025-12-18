document.addEventListener('DOMContentLoaded', function () {
    if (typeof window.Swiper != 'undefined') {
        const logosMarqueeWrapper = document.querySelector('.logos-marquee__section.swiper');
        const logosMarqueeSlidesNumber = logosMarqueeWrapper?.querySelectorAll('.logos-marquee__logo')?.length;
        let logosMarqueeSettings = {}

        if (window.innerWidth >= 850) {
            logosMarqueeSettings = {
                watchSlidesProgress: true,
                slidesPerView: logosMarqueeSlidesNumber < 7 ? logosMarqueeSlidesNumber : 7,
                spaceBetween: 0,
                grabCursor: false,
                centeredSlides: false,
                freeMode: true,
                loop: false
            }
        } else {
            logosMarqueeSettings = {
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

        const logosMarqueeSlider = new Swiper('.logos-marquee__section.swiper', logosMarqueeSettings);
    }
}, {once: true});