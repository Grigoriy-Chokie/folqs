document.addEventListener('DOMContentLoaded', function () {
    const tabHeadings = document.querySelectorAll('.ingredients-tabs__tab-item');
    const tabContents = document.querySelectorAll('.ingredients-tabs__content-item');

    tabHeadings.forEach((heading) => {
        heading.addEventListener('click', function () {
            const blockId = this.getAttribute('id');
            tabHeadings.forEach((heading) => heading.classList.remove('ingredients-tabs__tab-item--active'));
            tabContents.forEach((content) => content.classList.remove('ingredients-tabs__content-item--active'));

            this.classList.add('ingredients-tabs__tab-item--active');
            document
                .querySelector(`.ingredients-tabs__content-item--${blockId}`)
                .classList.add('ingredients-tabs__content-item--active');
        });
    });

    let tabHeadingsSlider = new Swiper('.ingredients-tabs__tabs-slider', {
        spaceBetween: 24,
        grabCursor: false,
        centeredSlides: false,
        slideToClickedSlide: true,
        breakpoints: {
            250: {
                slidesPerView: 'auto',
                spaceBetween: 24,
            },
            991: {
                spaceBetween: 0,
            },
        },
    });

    const url = new URL(window.location.href);
    const hash = url.hash.substring(1); 
    if (hash) {
        tabHeadings.forEach((heading) => {
            if (heading.textContent.includes(hash)) {
                heading.click();
                const parentSection = document.querySelector('.section__ingredients-tabs');
                if (parentSection) {
                    const offset = 100; 
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = parentSection.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
});
