const BREAK_POINT = 768

const nav = document.querySelector("nav")
const menuInput = document.getElementById("nav-menu")
const navMenu = [
    nav.querySelector("ul[class=links]"),
    nav.querySelector("div[class=divider]"),
    nav.querySelector("ul[class=join]")
]

function isMobileDevice() {
    return window.innerWidth <= BREAK_POINT
}

function animateMenu(state, skip) {
    var set = (skip === true) ? gsap.set  : gsap.to
    if (state) {
        set(navMenu, {
            x: 0,
        })
    } else {
        set(navMenu, {
            x: "-100%",
        })
    }
}

if (isMobileDevice()) {
    animateMenu(false, true)
}

function onMenuCheck(skip) {
    if (menuInput.checked === true) {
        nav.classList.add("menu-active")
        if (isMobileDevice()) { animateMenu(true, skip) }
    } else {
        nav.classList.remove("menu-active")
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

menuInput.addEventListener("click", onMenuCheck)
onMenuCheck()