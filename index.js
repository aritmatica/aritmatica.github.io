function genmathLog() {
    const genmath_log = document.getElementById("genmath-log")
    gsap.to(genmath_log, {
        scrollTrigger: {
            trigger: genmath_log,
            start: "top bottom",
            scrub: 1,
        },
        opacity: 0.9,
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
        opacity: 0.9,
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
        opacity: 0.9,
    })
}

function joinCirle() {
    const join_circle = document.getElementById("join-circle-shape")
    gsap.to(join_circle, {
        scrollTrigger: {
            trigger: join_circle,
            start: "top bottom",
            scrub: 1,
        },
        opacity: 0.2,
    })

    gsap.to(join_circle, {
        rotate: -360,
        repeat: -1,
        duration: 60,
        ease: "none",
    })
}

function scrollAnimations() {
    const header = document.querySelector("header")

    const header_main = header.querySelector("main")
    const header_title = header_main.querySelector("h1")
    const header_title_sup = header_title.querySelector("sup")
    const header_tagline = header_main.querySelector("span")
    const header_glow = header_main.getElementsByClassName("glow")[0]

    header_glow.style.opacity = 1

    const exercises_section = document.getElementById("exercises")
    const exercises_line = exercises_section.getElementsByClassName("line")[0]

    const join_section = document.getElementById("join")
    const join_line = join_section.getElementsByClassName("line")[0]

    const sections = document.body.querySelectorAll("section")
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const section_line = section.getElementsByClassName("line")[0]
        const section_card = section.getElementsByClassName("card")[0]
        if (section_line && section_card) {
            gsap.set(section_line, {
                backgroundSize: "100% 500%",
                scaleY: 0,
            })
            gsap.to(section_line, {
                scrollTrigger: {
                    trigger: section_line,
                    start: "top-=250px top",
                    end: "+=256px",
                    toggleActions: "restart none none none",
                    scrub: 1,
                },
                backgroundSize: "100% 100%",
                scaleY: 1,
            })
        }
    }

    ScrollReveal().reveal(header_title, {delay: 250, distance: '50px'})
    ScrollReveal().reveal(header_title_sup, {delay: 500, distance: '50px'})
    ScrollReveal().reveal(header_tagline, {delay: 750, distance: '50px'})
    ScrollReveal().reveal(header_glow, {delay: 1250})
    ScrollReveal().reveal(document.getElementsByClassName("card"), {delay: 100, reset: true})
}

document.addEventListener("DOMContentLoaded", () => {
    genmathLog()
    precalcCirle()
    exercisesShape()
    joinCirle()
    scrollAnimations()
})