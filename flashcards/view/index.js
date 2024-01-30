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

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
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

async function fetchCardpackData(cardpackNum) {
    try {
        const dataResponse = await fetch("/json/flashcards.json")
        if (!dataResponse.ok) { return console.error("response not ok 1") }

        const flashcardsData = await dataResponse.json()
        const cardpackData = flashcardsData.cardPacks[cardpackNum]

        if (cardpackData) {
            if (cardpackData.price != "Free") {
                window.location.href = "/pricing/?error=free-trial"
                return console.error("free trial")
            }
            return cardpackData
        } else {
            window.location.href = "/flashcards/"
            return console.error(String(cardpackNum) + " is not a member of flashcards cardpacks")
        }
    } catch (err) {
        console.error(err.message)
    }
}

function makeCards(data) {
    console.log(data)

    const cardpack = document.getElementById("cardpack")
    const cards_carousel = cardpack.getElementsByClassName("cards-carousel")[0]

    const cardsTextData = data.cards

    for (let i = 0; i < cardsTextData.length; i++) {
        const cardData = cardsTextData[i];
        const frontText = cardData[0]
        const backText = cardData[1]

        const card = document.createElement("div")
        const card_content = document.createElement("div")
        card.appendChild(card_content)
        const front = document.createElement("div")
        const back = document.createElement("div")
        card_content.appendChild(front)
        card_content.appendChild(back)

        card.classList.add("card")
        card_content.classList.add("card-content")
        front.classList.add("front")
        back.classList.add("back")

        card.classList.add(data.courseClass)
        front.innerHTML = frontText
        back.innerHTML = backText

        cards_carousel.appendChild(card)
    }

    return data
}

function setupHeader(data) {
    function prefixer(text) { return "cardpack-" + text }

    const course_code = document.getElementById(prefixer("course-code"))
    const title = document.getElementById(prefixer("title"))
    const description = document.getElementById(prefixer("description"))
    const cards = document.getElementById(prefixer("cards"))
    const difficulty = document.getElementById(prefixer("difficulty"))
    const price = document.getElementById(prefixer("price"))

    course_code.innerHTML = data.courseCode
    title.innerHTML = data.title
    description.innerHTML = data.description
    cards.innerHTML = cards.innerHTML + data.cards.length
    difficulty.innerHTML = difficulty.innerHTML + data.difficulty
    price.innerHTML = data.price

    difficulty.classList.add(data.difficulty.toLowerCase())
    price.classList.add(data.price.toLowerCase())

    return data
}

function setupFlickity() {
    const cardpack = document.getElementById("cardpack")
    const cards_carousel = cardpack.getElementsByClassName("cards-carousel")[0]

    const cards_flkty = new Flickity(cards_carousel, {
        cellAlign: "center",
        draggable: false,
        cellSelector: ".card",
    });

    var currentCard = cards_flkty.cells[0].element
    cards_flkty.on("change", (index) => {
        const lastCard = currentCard
        currentCard = cards_flkty.cells[index].element

        if (lastCard != currentCard) {
            const lastCardContent = lastCard.getElementsByClassName("card-content")[0]
            lastCardContent.classList.remove("reveal")
        }
    })

    return cards_flkty
}

function rotateCardsOnClick() {
    const cards = document.getElementsByClassName("card")
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const cardContent = card.getElementsByClassName("card-content")[0]

        cardContent.addEventListener("click", () => {
            const isSelected = card.classList.contains("is-selected")
            const isRevealed = cardContent.classList.contains("reveal")
            if (isSelected) {
                if (isRevealed) {
                    cardContent.classList.remove("reveal")
                } else {
                    cardContent.classList.add("reveal")
                }
            }
        })
    }
}

const searchParams = new URLSearchParams(window.location.search);
const cardpackParam = searchParams.get("cardpack")

function handleShuffle(flkty) {
    const loader_container = document.getElementsByClassName("loader-container")[0]
    const shuffle_button = document.getElementById("shuffle-flashcards")
    shuffle_button.onclick = () => {
        loader_container.classList.add("load")
        setTimeout(() => {
            const shuffledCells = shuffle(flkty.cells)
            
            for (let i = 0; i < shuffledCells.length; i++) {
                const cell = shuffledCells[i];
                flkty.remove(cell.element)
                if (Math.random() > 0.5) {
                    flkty.append(cell.element)
                } else {
                    flkty.prepend(cell.element)
                }
            }

            flkty.select(0, false, true)
            loader_container.classList.remove("load")
        }, 500)
    }
}

if (cardpackParam) {
    const cardpackNum = Number(cardpackParam)
    fetchCardpackData(cardpackNum)
        .then(DOMContentLoaded)
        .then(setupHeader)
        .then(makeCards)
        .then(renderKateX)
        .then(rotateCardsOnClick)
        .then(setupFlickity)
        .then(handleShuffle)
} else {
    window.location.href = "/flashcards/"
}