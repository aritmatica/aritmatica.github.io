import {injectTag} from "../js/modular.js";

function contentLoaded () {    
    injectTag("nav")
    console.log("farted")
}

document.addEventListener("DOMContentLoaded", contentLoaded)