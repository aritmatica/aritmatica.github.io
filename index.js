import './js/scrollreveal.js';

const header = document.getElementsByTagName("header")[0]
const header_title = header.getElementsByTagName("h1")[0]
const header_title_sup = header_title.getElementsByTagName("sup")[0]
const header_tagline = header.getElementsByTagName("span")[0]

ScrollReveal().reveal(header_title, {delay: 250, distance: '50px'})
ScrollReveal().reveal(header_title_sup, {delay: 500, distance: '50px'})
ScrollReveal().reveal(header_tagline, {delay: 750, distance: '50px'})