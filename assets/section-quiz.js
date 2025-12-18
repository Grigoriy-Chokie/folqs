window.addEventListener('DOMContentLoaded', () => {
    const quizSwiper = new Swiper('.quiz__content-wrapper', {
        slidesPerView: 1,
        spaceBetween: 0,
        allowTouchMove: false,
        navigation: {
            nextEl: '.quiz-navigation__button--next',
            prevEl: '.quiz-navigation__button--previous',
        },
        pagination: {
            el: ".content__quiz-pagination",
        },
    });

    const radioInputs = document.querySelectorAll('.quiz-item__options input[type="radio"]');
    const selectedOptions = {}; 

    quizSwiper.on('slideChange', function (e) {
        restoreCheckedOptions();
        checkNextButtonStatus();
    });

    function checkNextButtonStatus() {
        const activeSlide = quizSwiper?.slides[quizSwiper.activeIndex];
        const optionInputs = activeSlide?.querySelectorAll('.option-item__input');
        const nextButton = document.querySelector('.content__quiz-navigation .quiz-navigation__button--next');
        let anyOptionSelected = false;

        optionInputs.forEach(function (input) {
            if (input.checked) {
                anyOptionSelected = true;
            }
        });

        nextButton?.setAttribute('aria-disabled', !anyOptionSelected.toString());
        nextButton?.classList.toggle('quiz-navigation__button--disabled', !anyOptionSelected);        
    }

    function restoreCheckedOptions() {
        const activeSlide = quizSwiper?.slides[quizSwiper.activeIndex];
        const optionInputs = activeSlide?.querySelectorAll('.option-item__input');

        optionInputs.forEach(function (input) {
            const inputId = input.id;
            if (selectedOptions[inputId]) {
                input.checked = true;
            } else {
                input.checked = false;
            }
        });
    }

    radioInputs.forEach(function (input) {
        input.addEventListener('change', function () {
            const inputId = this.id;
            const optionsContainer = this.closest('.quiz-item__options');
            const otherInputs = optionsContainer?.querySelectorAll('input[type="radio"]');

            otherInputs.forEach(function (otherInput) {
                if (otherInput !== input) {
                    otherInput.checked = false;
                    const otherInputId = otherInput.id;
                    selectedOptions[otherInputId] = false;
                    otherInput.closest('.quiz-item__option-item')?.classList.remove("quiz-item__option-item--active");
                }
            });

            this.closest('.quiz-item__option-item')?.classList.add("quiz-item__option-item--active");
            selectedOptions[inputId] = true;
            checkNextButtonStatus();
        });
    });
    function logSelectedOptions() {
        const selectedValues = [];
        for (const optionId in selectedOptions) {
            if (selectedOptions.hasOwnProperty(optionId) && selectedOptions[optionId]) {
                selectedValues.push(optionId);
            }
        }
        if (quizSwiper.slides.length == selectedValues.length) {
            const params = selectedValues.map(value => encodeURIComponent(value.replace(/ /g, '_'))).join('&');
            let resultsPageUrl = `/pages/quiz-results?${params}`;
            window.location.href = resultsPageUrl;
        }
    }
    
    const nextButton = document.querySelector('.content__quiz-navigation .quiz-navigation__button--next');
    nextButton.addEventListener('click', function () {
        if (quizSwiper.activeIndex == quizSwiper.slides.length - 1) {
            logSelectedOptions();
        }
    });
    
    checkNextButtonStatus(); 
});
