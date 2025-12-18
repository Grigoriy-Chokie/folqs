document.addEventListener("DOMContentLoaded", () => {
    let currentOrder;
    let thumbnailsItems = document.querySelectorAll('.member-slider__image');
    let memberSlider = new Swiper(".members-slider", {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        grabCursor: true,
        effect: "fade",
        fadeEffect: { crossFade: true },
    });
    memberSlider.on('slideChange', function () {
        const activeIndex = memberSlider.activeIndex;
        thumbnailsItems.forEach((item, index) => {
            item.classList.toggle('member-slider__image-active', index === activeIndex);
        });
    });
    let autoSlideTimer;

    function startAutoSlide() {
        thumbnailsItems[0]?.classList.add('member-slider__image-active');
        autoSlideTimer = setInterval(() => {
            let currentIndex = memberSlider.activeIndex;
            if (currentIndex == memberSlider.slides.length - 1) {
                currentOrder = parseInt(thumbnailsItems[currentIndex].style.order) + thumbnailsItems.length
                if (thumbnailsItems[currentIndex]) {
                    thumbnailsItems[currentIndex].style.order = currentOrder;
                }
                currentIndex = 0;
            } else {
                currentOrder = parseInt(thumbnailsItems[currentIndex].style.order) + thumbnailsItems.length
                if (thumbnailsItems[currentIndex]) {
                    thumbnailsItems[currentIndex].style.order = currentOrder;
                }
                currentIndex = memberSlider.activeIndex + 1;
            }

            memberSlider.slideTo(currentIndex);
        }, timerDelay * 1000);
    }

    function resetAutoSlide(isCreateTimeout) {
        if (isCreateTimeout) {
            clearInterval(autoSlideTimer);
            startAutoSlide(isCreateTimeout);
        } else {
            clearInterval(autoSlideTimer);
        }
    }

    const observer = new MutationObserver((mutationsList, observer) => {
        mutationsList.forEach(mutation => {
            if (mutation.attributeName === 'class' && !mutation.target.classList.contains('scroll-trigger--offscreen')) {
                startAutoSlide(true);
            }
        });
    });
    const targetNode = document.querySelector('.members');
    const config = { attributes: true };
    observer.observe(targetNode, config);

    thumbnailsItems.forEach((thumbnailItem, index) => {
        thumbnailItem.addEventListener('click', () => {
            const activeItem = document.querySelector('.member-slider__image-active');
    
            if (activeItem) {
                memberSlider.destroy();

                const parent = thumbnailItem.parentElement;
                const currentIndex = Array.from(parent.children).indexOf(thumbnailItem);
                const activeIndex = Array.from(parent.children).indexOf(activeItem);
    
                if (currentIndex !== -1 && activeIndex !== -1) {
                    parent.appendChild(activeItem); 
                    parent.insertBefore(thumbnailItem, parent.firstChild); 
                    const slides = document.querySelectorAll('.members-slider .swiper-slide');
                    const slider = slides[0].parentElement;
                    slider.appendChild(slides[activeIndex]); 
                    slider.insertBefore(slides[currentIndex], slider.firstChild);
                }
    
                thumbnailsItems = document.querySelectorAll('.member-slider__image');
                thumbnailsItems.forEach(item => item.removeAttribute('aria-label'));
                memberSlider = new Swiper(".members-slider", {
                    loop: true,
                    slidesPerView: 1,
                    spaceBetween: 10,
                    grabCursor: true,
                    effect: "fade",
                    fadeEffect: { crossFade: true },
                });
    
                memberSlider.on('slideChange', function () {
                    const activeIndex = memberSlider.activeIndex;
                    thumbnailsItems.forEach((item, index) => {
                        item.classList.toggle('member-slider__image-active', index === activeIndex);
                    });
                });
    
                thumbnailsItems.forEach((item, index) => {
                    item.style.order = index + thumbnailsItems.length;
                });
    
                thumbnailsItems.forEach(item => item.classList.remove('member-slider__image-active'));
                thumbnailsItems[0]?.classList.add('member-slider__image-active');
    
                resetAutoSlide(false);
            }
        });
    });
    
});
