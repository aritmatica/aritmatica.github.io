const CLASS_NAME = "fancy-button"

const buttons = document.getElementsByClassName(CLASS_NAME)

for (let i = 0; i < buttons.length; i++) {
    const elem = buttons[i]
    const flair = elem.getElementsByClassName("flair")[0]

    gsap.set(flair, {
        scale: 0,
    })

    function mouseEnter(e) {
        const mouseX = e.clientX
        const mouseY = e.clientY
        gsap.set(elem, {
            css: {
                clipPath: "margin-box"  
            }
        })
        gsap.to(flair, {
            duration: 0.3,
            overwrite: "auto",
            scale: 1,
            ease: "none",
        })
    }

    let firstEnter = true
    function mouseUpdate(e) {
        const mouseX = e.clientX
        const mouseY = e.clientY

        let dur = 0.3

        if (firstEnter) {
            firstEnter = false
            dur = 0
        }

        gsap.to(flair, {
            duration: dur,
            overwrite: "auto",
            x: mouseX,
            y: mouseY,
            ease: "none",
        })
    }
    
    function mouseLeave(e) {
        firstEnter = true
        gsap.to(flair, {
            duration: 0.1,
            overwrite: "auto",
            scale: 0,
            ease: "none",
        })
    }


    elem.addEventListener("mouseenter", mouseEnter)
    elem.addEventListener("mousemove", mouseUpdate)
    elem.addEventListener("mouseleave", mouseLeave)
}