const thumb = <HTMLDivElement> document.getElementById("thumb")
const hamburger = <HTMLInputElement> document.getElementById("hamburger")
const dim = <HTMLDivElement> document.getElementById("dim")

let moveThumb = false
let startThumb = 0

// Move thumb on mousedown
thumb.addEventListener("mousedown", event => {
	moveThumb = true
	startThumb = event.y - window.scrollY / document.body.clientHeight * window.innerHeight
	thumb.style.opacity = "1"
	thumb.style.animation = "none"
	document.documentElement.style.scrollBehavior = "auto"
})

// Hide scrollbar when on mobile
window.addEventListener("touchmove", () => (<HTMLDivElement> document.getElementById("scrollbar")).hidden = true)

// Scroll window
window.addEventListener("mousemove", event => {
	if (moveThumb) {
		event.preventDefault()
		window.scrollTo(0, (event.y - startThumb) * document.body.clientHeight / window.innerHeight)
	}
})

// Reset everything
window.addEventListener("mouseup", () => {
	moveThumb = false
	thumb.style.opacity = ""
	thumb.style.animation = ""
	document.documentElement.style.scrollBehavior = ""
})

// Change height based on scroll
window.addEventListener("scroll", () => {
	thumb.style.top = window.scrollY * window.innerHeight / document.body.clientHeight + "px"
})

// When dim is clicked, close menu
dim.addEventListener("click", () => {
	hamburger.checked = false
})