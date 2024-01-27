import { scanForButtons } from "https://cdn.jsdelivr.net/gh/aritmatica/cdn/js/fancyButtons.js";

var _domContentLoaded = false
function DOMContentLoaded(...args) {
    if (_domContentLoaded) {
        return Promise.resolve(...args)
    } else {
        return new Promise(resolve => document.addEventListener("DOMContentLoaded", () => {
            _domContentLoaded = true
            resolve(...args)
        }))
    }
}
DOMContentLoaded()

function populateCardpack(template, data, index) {
    template.classList.add(data.courseClass)
    if (data.active === true) { template.classList.add("active") }

    function prefixer(text) {
        return "cardpack-" + text
    }

    // elements
    //const content = template.getElementsByClassName(prefixer("content"))[0]
    const courseCode = template.getElementsByClassName(prefixer("course-code"))[0]
    const title = template.getElementsByClassName(prefixer("title"))[0]
    //const properties = template.getElementsByClassName(prefixer("properties"))[0]
    const terms = template.getElementsByClassName(prefixer("terms"))[0]
    const difficulty = template.getElementsByClassName(prefixer("difficulty"))[0]
    const price = template.getElementsByClassName(prefixer("price"))[0]
    const description = template.getElementsByClassName(prefixer("description"))[0]
    const openCardpack = template.getElementsByClassName("open-cardpack")[0]
    const openModule = template.getElementsByClassName("open-module")[0]
    const meta = template.getElementsByClassName(prefixer("data"))[0]

    // transforms
    courseCode.innerHTML = data.courseCode
    title.innerHTML = data.title
    terms.innerHTML = terms.innerHTML + String(data.cards.length)
    difficulty.innerHTML = difficulty.innerHTML + data.difficulty
    price.innerHTML = price.innerHTML + data.price
    description.innerHTML = data.description
    meta.setAttribute("data-cardpack", JSON.stringify(data))

    if (data.price != "Free") {
        openCardpack.classList.add("upgrade-" + data.price.toLowerCase())
        openCardpack.setAttribute("href", "/pricing/")
    } else {
        openCardpack.setAttribute("href", openCardpack.getAttribute("href") + "?cardpack=" + index)
    }
    
    if (data.moduleHref != false) {
        openModule.setAttribute("href", data.moduleHref)
    } else {
        openModule.classList.add("locked")
    }

    // class transform
    difficulty.classList.add(data.difficulty.toLowerCase())
    price.classList.add(data.price.toLowerCase())
}

async function makeCardpacks(flkty) {
    try {
        const templateResponse = await fetch("/components/cardpack.html")
        if (!templateResponse.ok) {
            console.error("response not ok 1")
            return;
        }
        
        const templateText = await templateResponse.text()

        const dataResponse = await fetch("/json/flashcards.json")
        if (!dataResponse.ok) {
            console.error("response not ok 2")
            return;
        }

        const data = await dataResponse.json()

        for (let i = 0; i < data.cardPacks.length; i++) {
            const cardpackData = data.cardPacks[i];

            const cardpack = document.createElement("div")
            cardpack.innerHTML = templateText
            cardpack.classList.add("cardpack")

            populateCardpack(cardpack, cardpackData, i)

            flkty.append(cardpack)
        }
    } catch (err) {
        console.error(err.message)
    }
}

function setupFlickity () {
    const flashcards = document.getElementById("flashcards")
    const fc_carousel = flashcards.getElementsByClassName("flashcards-carousel")[0]
    const fc_flkty = new Flickity(fc_carousel, {
        cellAlign: "center",
        autoPlay: true,
    });

    return fc_flkty
}

DOMContentLoaded()
.then(setupFlickity)
.then(makeCardpacks)
.then(() => {
    const flashcardsCarousel = document.getElementsByClassName("flashcards-carousel")[0]
    scanForButtons(flashcardsCarousel)
})