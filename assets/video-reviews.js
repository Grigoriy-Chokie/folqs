document.addEventListener("DOMContentLoaded", () => {

    const initializeAllSliders = () => {
        document.querySelectorAll('.video-reviews-grid').forEach((section) => {
            section.querySelectorAll(".video-review__item-inner").forEach( videoWrapper => {
                const video = videoWrapper.querySelector("video")

                if(!video) return

                videoWrapper.addEventListener("click", ()=> {
                    video[`${video.paused ? "play": "pause"}`]()
                    videoWrapper.classList.toggle("is-active", !video.paused)
                    setTimeout(() => {
                        video.setAttribute('controls', '')
                    }, 300)
                }, {once: true})
            })
        })
    }

    const videoSection = document.querySelector('.video-reviews__section')
    if (videoSection) {
        const options = {
          threshold: 0.01,
        };

        const onEntry = (entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
                initializeAllSliders()
                observer.disconnect();
            }
          });
        };

        const observer = new IntersectionObserver(onEntry, options);
        observer.observe(videoSection);
    }
}, {once: true});
