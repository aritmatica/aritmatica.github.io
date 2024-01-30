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

function setupImageCarousels() {
    const galleries = document.getElementsByClassName("gallery-carousel")
    for (let i = 0; i < galleries.length; i++) {
        const elem = galleries[i];
        const gallery_flkty = new Flickity(elem, {
            autoPlay: 3000,
            adaptiveHeight: false,
            pageDots: false,
            prevNextButtons: false,
            cellAlign: "center",
            draggable: false,
            wrapAround: true,
            cellSelector: ".cell",
        });
        gallery_flkty.resize()
    }
}

DOMContentLoaded().then(setupImageCarousels)