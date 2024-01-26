import { injectAll } from "../js/modular.js";
import { scanForButtons } from "../js/fancyButtons.js";

function animateModulesNav() {
    const BREAK_POINT = 1024

    const buttonContainer = document.getElementsByClassName("open-button")[0]
    const navOpen = document.getElementById("open-modules-nav")
    const modulesNav = document.getElementById("modules-nav")

    function isMobileDevice() {
        return document.body.clientWidth <= BREAK_POINT
    }

    function animateMenu(state, skip) {
        var set = (skip === true) ? gsap.set : gsap.to
        if (state) {
            buttonContainer.classList.add("open")
            set(modulesNav, {
                translateY: -16,
            })
        } else {
            buttonContainer.classList.remove("open")
            set(modulesNav, {
                translateY: "-100%",
            })
        }
    }

    if (isMobileDevice()) {
        animateMenu(false, true)
    }

    function onMenuCheck(skip) {
        if (navOpen.checked === true) {
            if (isMobileDevice()) { animateMenu(true, skip) }
        } else {
            if (isMobileDevice()) { animateMenu(false, skip) }
        }
    }

    window.addEventListener("resize", () => {
        if (isMobileDevice() === false) {
            animateMenu(true, true)
        } else {
            onMenuCheck(true)
        }
    })

    navOpen.addEventListener("click", onMenuCheck)
    onMenuCheck()
}

function renderKateX() {
    renderMathInElement(document.body, {
        delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\[", right: "\\]", display: true }
        ]
    })
}

function spoiler() {
    const spoilers = document.getElementsByClassName("spoiler")
    for (let i = 0; i < spoilers.length; i++) {
        const elem = spoilers[i];
        elem.onclick = () => {
            elem.style.opacity = 0;
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    animateModulesNav()
    injectAll().then(() => {
        renderKateX()
        scanForButtons(document.querySelector("article"))
        spoiler()
    })
})