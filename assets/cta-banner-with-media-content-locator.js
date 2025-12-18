document.addEventListener("DOMContentLoaded", () => {
    let floatingIslandItems = document.querySelectorAll('.floating-islands__island-item');

    function updateIslandsPositions() {
        floatingIslandItems.forEach(function (item, index) {
            if (index > 0) {
                let offset = 20;
                if (window.innerWidth > 2300) {
                    offset = 120;
                }else if (window.innerWidth > 1800) {
                    offset = 60;
                } else if (window.innerWidth > 1000) {
                    offset = 46;
                } else if (window.innerWidth < 600 && window.innerWidth > 480) {
                    offset = 46;
                } else if (window.innerWidth < 660) {
                    offset = 25;
                } else if (window.innerWidth < 900) {
                    offset = 55;
                }

                let newTop = parseFloat(window.getComputedStyle(floatingIslandItems[index - 1]).top) + offset + floatingIslandItems[index - 1].offsetHeight;
                item.style.top = newTop + 'px';
            }
        });
    }

    updateIslandsPositions();

    window.addEventListener('resize', function () {
        updateIslandsPositions();
    });

}, {once: true});