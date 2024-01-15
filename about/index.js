import {injectTag} from "../js/modular.js";

gsap.registerPlugin(ScrollTrigger)

function bodyLoaded () {    
    injectTag("nav")
}

document.body.onload = bodyLoaded