import {injectTag} from "./js/modular.js";

gsap.registerPlugin(ScrollTrigger)

function contentLoaded () {
    injectTag("nav")

    const header = document.querySelector("header")

    const header_main = header.querySelector("main")
    const header_title = header_main.querySelector("h1")
    const header_title_sup = header_title.querySelector("sup")
    const header_tagline = header_main.querySelector("span")
    const header_glow = header_main.getElementsByClassName("glow")[0]
    
    header_glow.style.opacity = 1

    ScrollReveal().reveal(header_title, {delay: 250, distance: '50px'})
    ScrollReveal().reveal(header_title_sup, {delay: 500, distance: '50px'})
    ScrollReveal().reveal(header_tagline, {delay: 750, distance: '50px'})
    ScrollReveal().reveal(header_glow, {delay: 1250})
}

document.addEventListener("DOMContentLoaded", contentLoaded)