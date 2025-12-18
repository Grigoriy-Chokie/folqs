document.addEventListener("DOMContentLoaded", function () {
    const scienceGround = document.querySelector(".science__ground");
    if (!scienceGround) return; 

    const percentageItems = scienceGround.querySelectorAll('.percentage-item__percentage-amount');

    function changeValues() {
        percentageItems.forEach(item => {
            const dataAmount = parseInt(item.getAttribute('data-amount'));
            let count = 0;
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const interval = setInterval(() => {
                            if (count < dataAmount) {
                                count++;
                                item.textContent = count;
                            }
                            if (count >= dataAmount) {
                                clearInterval(interval);
                                observer.disconnect();
                            }
                        }, 10);
                    }
                });
            }, { rootMargin: "0px", threshold: 1 });
            observer.observe(item);
        });
    }

    changeValues();
}, {once: true});
