window.addEventListener('scroll', function () {
    let textBlocks = document.querySelectorAll('.text-blocks__text-block');
    let activeBlockIndex = -1;

    textBlocks.forEach(function (block, index) {
        let rect = block.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            activeBlockIndex = index;
        }
    });

    textBlocks.forEach(function (block) {
        block.classList.remove('text-blocks__text-block--active');
    });

    if (activeBlockIndex !== -1) {
        textBlocks[activeBlockIndex]?.classList.add('text-blocks__text-block--active');
    }
});