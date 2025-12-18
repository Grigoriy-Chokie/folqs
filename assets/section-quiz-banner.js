window.addEventListener('DOMContentLoaded', () => {
    let hideSectionButton = document.querySelector('.quiz-banner__button');
    let parentSection = hideSectionButton?.closest(sectionName);

    function toggleScroll(isScrollDisabled) {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        if (isScrollDisabled) {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        } else {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = scrollBarWidth + 'px';
        }
    }


    hideSectionButton.addEventListener('click', function () {
        if (parentSection) {
            parentSection.style.height = '0';
            parentSection.style.minHeight = '0';
            toggleScroll(true);
        }
    });
    toggleScroll(false);
});

