import {injectTag} from "./modular.js";

function contentLoaded () {    
    injectTag("nav")
    console.log("farted")
}

document.addEventListener("DOMContentLoaded", contentLoaded)