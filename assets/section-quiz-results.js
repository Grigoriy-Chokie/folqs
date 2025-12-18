window.addEventListener('DOMContentLoaded', () => {
    const resultItems = document.querySelectorAll('.results__result-item');

    resultItems.forEach(item => {
        const randomClassNumber = Math.floor(Math.random() * 3) + 1;
        const randomClassName = `results__result-item--${randomClassNumber}`;
        item.classList.add(randomClassName);
    });
});
