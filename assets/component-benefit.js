(function () {
    const activeClassName = 'benefits__nav-item--active';
    const contentElements = document.querySelectorAll('.benefits__item');
    const navigationElements = document.querySelectorAll('.benefits__nav-item');
    let isProgrammaticScroll = false;
    let lastActiveHash = null;
    let scrollTimeout = null;

    const throttle = (callback, limit) => {
        let wait = false;
        return function () {
            if (!wait) {
                callback.apply(this, arguments);
                wait = true;
                setTimeout(() => {
                    wait = false;
                }, limit);
            }
        }
    };

    const observer = new IntersectionObserver(throttle((entries) => {
        if (isProgrammaticScroll) {
            isProgrammaticScroll = false;
            return;
        }
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeHash = '#' + entry.target.id;
                if (activeHash !== lastActiveHash) {
                    lastActiveHash = activeHash;
                    updateActiveNavigationElement(activeHash);
                }
            }
        });
    }, 100), { rootMargin: '0px', threshold: 0.5 });

    contentElements.forEach(item => {
        observer.observe(item);
    });

    function isBenefitsSectionVisible() {
        const benefitsSection = document.querySelector('.shopify-section-benefits');
        if (!benefitsSection) return false;
        const rect = benefitsSection.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    function scrollIntoViewSmooth(element) {
        return new Promise(resolve => {
            if (!isBenefitsSectionVisible()) return resolve();
            isProgrammaticScroll = true;
            element.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
            requestAnimationFrame(() => {
                resolve();
            });
        });
    }

    function updateActiveNavigationElement(hash) {
        const activeLink = document.querySelector(`.benefits__nav-item[href="${hash}"]`);
        if (!activeLink) return;
        navigationElements.forEach(navigationElement => {
            navigationElement.classList.remove(activeClassName);
        });
        activeLink.classList.add(activeClassName);
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            scrollIntoViewSmooth(activeLink);
        }, 700);
    }

    navigationElements.forEach(navigationElement => {
        navigationElement.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                scrollIntoViewSmooth(targetElement).then(() => {
                    updateActiveNavigationElement(targetId);
                });
            }
        });
    });
})();
