document.addEventListener('DOMContentLoaded', function () {
    let clickTimeout = null;

    function handleClick() {
        if (clickTimeout) return;
        dataLayer.push(
            {
                event: "view_content"
            });
        clickTimeout = setTimeout(() => {
            clickTimeout = null;
        }, 300);
    }

    document.querySelector('.formula__navigation-link.formula__navigation-link-secondary')?.addEventListener('click', handleClick);

    document.querySelector('.header__navigation-link.header__navigation-link-main')?.addEventListener('click', handleClick);
}, {once: true});