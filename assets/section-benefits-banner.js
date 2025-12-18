(()=>{
    const section = document.currentScript.closest('section')
    const stickyButton = section.querySelector("[data-sticky-button]")
    const targetSection = document.querySelector(`#${stickyButton.dataset.stickyButton}`)

    if(!stickyButton || !targetSection) return

    const observers = [section, targetSection].map(section => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                stickyButton.classList.toggle("hidden", entry.isIntersecting)
            })
        },{ rootMargin: "-100px", threshold: 0 })

        observer.observe(section)

        return  observer
    })

    stickyButton.addEventListener('click', ()=> {
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth',
        });
    })

    const iconClose = stickyButton.querySelector('svg')
    if(!iconClose) return;

    iconClose.addEventListener('click', ()=>{
        stickyButton.classList.add('hidden')
        observers.forEach(observer => observer.disconnect())
    })
})()