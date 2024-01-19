import {injectAll} from "./js/modular.js";

gsap.registerPlugin(ScrollTrigger)

function contentLoaded () {
    injectAll()

    const header = document.querySelector("header")

    const header_main = header.querySelector("main")
    const header_title = header_main.querySelector("h1")
    const header_title_sup = header_title.querySelector("sup")
    const header_tagline = header_main.querySelector("span")
    const header_glow = header_main.getElementsByClassName("glow")[0]
    
    header_glow.style.opacity = 1

    document.body.querySelectorAll("section").forEach((section) => {
        const section_line = section.getElementsByClassName("line")[0]
        const section_card = section.getElementsByClassName("card")[0]
        if (section_line && section_card) {
            gsap.set(section_line, {scaleY: 0})
            gsap.to(section_line, {
                scrollTrigger: {
                    trigger: section_card,
                    toggleActions: "restart none none none",
                    scrub: 1,
                },
                scaleY: 1,
            })
        }
    })

    setTimeout(() => {
        const loading = document.getElementById("loading")
        loading.setAttribute("data-loaded", "true")
        document.body.setAttribute("data-loaded", "true")

        ScrollReveal().reveal(header_title, {delay: 250, distance: '50px'})
        ScrollReveal().reveal(header_title_sup, {delay: 500, distance: '50px'})
        ScrollReveal().reveal(header_tagline, {delay: 750, distance: '50px'})
        ScrollReveal().reveal(header_glow, {delay: 1250})
        ScrollReveal().reveal(document.getElementsByClassName("card"), {delay: 500, distance: '50px', reset: true})
    }, 250)
}

document.addEventListener("DOMContentLoaded", contentLoaded)