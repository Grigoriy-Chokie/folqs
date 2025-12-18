(()=>{
    const {targetSelector, anchorLink} = document.currentScript.dataset

    const targetElem = document.querySelector(`${targetSelector}`)
    if(!targetElem || window.innerWidth > 750) return

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        const href = link.getAttribute("href")

        if(href !== anchorLink) return

        link.addEventListener("click", event => {
            event.preventDefault()

            const targetPosition = targetElem.getBoundingClientRect().top;
            const offsetPosition = targetPosition + window.pageYOffset - (window.innerHeight - targetElem.clientHeight) + 20;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        })
    })
})()
