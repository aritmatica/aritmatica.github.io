function genmathLog() {
    const genmath_log = document.getElementById("genmath-log")
    gsap.to(genmath_log, {
        scrollTrigger: {
            trigger: genmath_log,
            start: "top bottom",
            scrub: 1,
        },
        opacity: 0.8,
    })
}

function precalcCirle() {
    const precalc_circle = document.getElementById("precalc-circle")
    gsap.to(precalc_circle, {
        scrollTrigger: {
            trigger: precalc_circle,
            start: "top bottom",
            scrub: 1,
        },
        opacity: 0.8,
    })

    gsap.to(precalc_circle, {
        rotate: -360,
        repeat: -1,
        duration: 60,
        ease: "none",
    })
}

document.addEventListener("DOMContentLoaded", () => {
    genmathLog()
    precalcCirle()
    renderMathInElement(document.body, {
        delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\[", right: "\\]", display: true }
        ]
    })
})