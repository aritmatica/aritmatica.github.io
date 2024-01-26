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

function exercisesShape() {
    const exercises_shape = document.getElementById("exercises-shape")
    gsap.to(exercises_shape, {
        scrollTrigger: {
            trigger: exercises_shape,
            start: "top bottom",
            scrub: 1,
        },
        opacity: 0.8,
    })
}

document.addEventListener("DOMContentLoaded", () => {
    genmathLog()
    precalcCirle()
    exercisesShape()
})