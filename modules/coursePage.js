function animateModulesNav() {
    const BREAK_POINT = 1024

    const open_modules_nav = document.getElementById("open-modules-nav")
    const modules_nav = document.getElementById("modules-nav")

    function updateModulesNav() {
        if (open_modules_nav.checked === true) {
            gsap.to(modules_nav, {
                translateY: 0,
            })
        } else {
            gsap.to(modules_nav, {
                translateY: "-100%",
            })
        }
    }

    open_modules_nav.addEventListener("click", updateModulesNav)

    window.addEventListener("resize", () => {
        open_modules_nav.checked = false
        gsap.set(open_modules_nav, {
            translateY: 0,
        })
    })
}

document.addEventListener("DOMContentLoaded", () => {
    animateModulesNav()
    renderMathInElement(document.body, {
        delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\[", right: "\\]", display: true }
        ]
    })
})