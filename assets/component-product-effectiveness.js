document.addEventListener("DOMContentLoaded", function () {
    const effectivenessContainer = document.querySelector('.effectiveness-container');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                effectivenessContainer?.classList.add("effectiveness-container--active");
                observer.disconnect();
            }
        });
    }, { rootMargin: '0px 0px 0px 0px', threshold: 0.5 });

    if (effectivenessContainer) {
        observer.observe(effectivenessContainer);
    }
}, {once: true});
