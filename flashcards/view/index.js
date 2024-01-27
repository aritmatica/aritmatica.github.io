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

async function fetchCardpackData(cardpackNum) {
    try {
        const dataResponse = await fetch("/json/flashcards.json")
        if (!dataResponse.ok) { return console.error("response not ok") }

        const flashcardsData = await dataResponse.json()
        if (flashcardsData.cardPacks[cardpackNum]) {
            return flashcardsData.cardPacks[cardpackNum]
        } else {
            return console.error(String(cardpackNum) + " is not a member of flashcards cardpacks")
        }
    } catch(err) {
        console.error(err.message)
    }
}

function makeCards(data) {
    return
}

function setupFlickity () {
    const cardpack = document.getElementById("cardpack")
    const card_carousel = cardpack.getElementsByClassName("cards-carousel")[0]
    const cards_flkty = new Flickity(card_carousel, {
        cellAlign: "center",
    });

    return
}


const searchParams = new URLSearchParams(window.location.search);
const cardpackParam = searchParams.get("cardpack")

if (cardpackParam) {
    const cardpackNum = Number(cardpackParam)
    fetchCardpackData(cardpackNum)
    .then(DOMContentLoaded)
    .then(makeCards)
    .then(setupFlickity)
} else {
    window.location.href = "/flashcards/"
}