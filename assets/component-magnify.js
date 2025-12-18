document.addEventListener("DOMContentLoaded", enableMagnifyZoom);

function enableMagnifyZoom() {
    const isTouchDevice = () => !window.matchMedia('(hover: hover)').matches;
    if (isTouchDevice()) return;

    const magnifyContainers = document.querySelectorAll(".product__modal-magnify");
    if (!magnifyContainers.length) return;

    magnifyContainers.forEach(container => {
        const { image } = container.dataset;
        if (!image) return;

        const lens = createLens(image);
        container.append(lens);
        attachMagnifyEvents(container, lens);
    });

    function createLens(src) {
        const lens = document.createElement("div");
        lens.className = "image-magnify";
        lens.style.backgroundImage = `url(${src})`;
        return lens;
    }

    function attachMagnifyEvents(container, lens) {
        const zoom = 1.5;
        let animationFrame;

        const updateLens = (event) => {
            const rect = container.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const cursorX = Math.max(0, Math.min(x, rect.width));
            const cursorY = Math.max(0, Math.min(y, rect.height));

            lens.style.left = `${cursorX}px`;
            lens.style.top = `${cursorY}px`;

            const backgroundX = -(cursorX * zoom - lens.offsetWidth / 2);
            const backgroundY = -(cursorY * zoom - lens.offsetHeight / 2);

            lens.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;
            lens.style.backgroundPosition = `${backgroundX}px ${backgroundY}px`;
        };

        container.addEventListener("mousemove", (event) => {
            lens.classList.add("image-magnify--show");

            cancelAnimationFrame(animationFrame);
            animationFrame = requestAnimationFrame(() => updateLens(event));
        });

        container.addEventListener("mouseleave", () => {
            lens.classList.remove("image-magnify--show");
        });
    }
}