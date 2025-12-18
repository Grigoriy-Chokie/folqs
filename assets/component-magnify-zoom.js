document.addEventListener("DOMContentLoaded", function () {
    const isTouchDevice = () => !window.matchMedia('(hover: hover)').matches;
    if (isTouchDevice()) return;

    const magnifyContainer = document.querySelectorAll(".product__modal-magnify");

    magnifyContainer.forEach(container => {
        const { dataset: { image } } = container
        const createdImage = createImage(image);
        insertMagnifyImage(createdImage, container)
    })

    function createImage(src) {
        const image = document.createElement("img");
        image.className = "image-magnify";
        image.src = src;

        return image
    }

    function insertMagnifyImage(createdImage, parentContainer) {
        if (!(createdImage instanceof HTMLImageElement)) {
            console.error("The provided image is not an HTMLImageElement.");
        }

        createdImage.addEventListener("load", function () {
            parentContainer.append(createdImage);
            attachEvents(parentContainer, createdImage)
        })

    }

    function attachEvents(parentContainer, image) {
        if (!(image instanceof HTMLImageElement)) {
            console.error("The provided image is not an HTMLImageElement.");
        }
        const setPosition = (x, y) => image.style.objectPosition = `${x}% ${y}%`

        parentContainer.addEventListener("mousemove", function (event) {
            image.classList.add("image-magnify--show")
            const { x, y } = determineCoordinate(event, image);
            setPosition(x, y);
        })

        parentContainer.addEventListener("mouseleave", function () {
            image.classList.remove("image-magnify--show")
            setPosition(50, 50);
        })
    }

    function determineCoordinate(event, image) {
        const offsetX = event.offsetX;
        const offsetY = event.offsetY;
        const coordinateX = offsetX / image.offsetWidth * 100;
        const coordinateY = offsetY / image.offsetHeight * 100;
        return {
            x: coordinateX,
            y: coordinateY
        }
    }
})