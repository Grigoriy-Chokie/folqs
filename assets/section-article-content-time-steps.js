document.addEventListener('DOMContentLoaded', () => {
    const timeStepIcons = document.querySelectorAll('.time-step__icon');

    const timeStepIconsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            entries[0].target.classList.add('icon--animate');
        }
    }, { threshold: 1.0 })

    timeStepIcons.forEach((icon) => {
        setTimeout(()=>{
            hideOnSectionVisible(icon);
        },100)
        timeStepIconsObserver.observe(icon);
    })
})

function hideOnSectionVisible(element) {
    if (element) {
        const windowBottom = window.scrollY + document.documentElement.clientHeight;
        const top = window.scrollY + element.getBoundingClientRect().top;
        
        element.classList.toggle('icon--animate', top < windowBottom - element.getBoundingClientRect().height);
    }
}