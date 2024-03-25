"use strict";
const thumb = document.getElementById("thumb");
const hamburger = document.getElementById("hamburger");
const dim = document.getElementById("dim");
let moveThumb = false;
let startThumb = 0;
thumb.addEventListener("mousedown", event => {
    moveThumb = true;
    startThumb = event.y - window.scrollY / document.body.clientHeight * window.innerHeight;
    thumb.style.opacity = "1";
    thumb.style.animation = "none";
    document.documentElement.style.scrollBehavior = "auto";
});
window.addEventListener("touchmove", () => document.getElementById("scrollbar").hidden = true);
window.addEventListener("mousemove", event => {
    if (moveThumb) {
        event.preventDefault();
        window.scrollTo(0, (event.y - startThumb) * document.body.clientHeight / window.innerHeight);
    }
});
window.addEventListener("mouseup", () => {
    moveThumb = false;
    thumb.style.opacity = "";
    thumb.style.animation = "";
    document.documentElement.style.scrollBehavior = "";
});
window.addEventListener("scroll", () => {
    thumb.style.top = window.scrollY * window.innerHeight / document.body.clientHeight + "px";
});
dim.addEventListener("click", () => {
    hamburger.checked = false;
});
