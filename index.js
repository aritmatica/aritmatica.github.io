import {injectTag} from "./js/modular.js";

gsap.registerPlugin(ScrollTrigger)

function contentLoaded () {
    const header = document.querySelector("header")
    const header_title = header.querySelector("h1")
    const header_title_sup = header_title.querySelector("sup")
    const header_tagline = header.querySelector("span")
    
    ScrollReveal().reveal(header_title, {delay: 250, distance: '50px'})
    ScrollReveal().reveal(header_title_sup, {delay: 500, distance: '50px'})
    ScrollReveal().reveal(header_tagline, {delay: 750, distance: '50px'})
    
    injectTag("nav")

    barba.init({
        transitions: [{
            debug: true,
            name: 'transition 1',
            enter(data) {
            },
            leave(data) {
            },
        }]
    });
}

document.addEventListener("DOMContentLoaded", contentLoaded)