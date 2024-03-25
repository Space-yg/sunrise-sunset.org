import { headingToAnchor } from "./helpers.js"
import md from "./markdown.js"

// Tags
const main = document.getElementsByTagName("main")[0]
const article = document.getElementsByTagName("article")[0]
const title = document.getElementsByTagName("title")[0]

/** The path has `sunrise-sunset.org` */
const deploymentPath = location.pathname.split("/")[1] === "sunrise-sunset.org"

/**
 * Try to find a file. If it is not found, then show and error
 * @param path The path to look for the file
 * @returns The {@link Response}
 */
async function findFile(path: string): Promise<Response> {
	var file: Response
	if (path.startsWith("/")) {
		if (deploymentPath) file = await fetch(location.origin + "/sunrise-sunset.org" + path)
		else file = await fetch(location.origin + path)
	} else {
		file = await fetch(path)
	}
	if (!file.ok) article.innerHTML = `<p>Woah! That shouldn't happen.</p><p>Please open an issue <a href='https://github.com/Space-yg/sunrise-sunset.org/issues'>here</a> to fix this problem.</p><p>Problem: File <code>${path.startsWith("./") ? location.origin + location.pathname.split("/").slice(0, -1).join("/").replace(path.slice(1).split("/").slice(0, -1).join("/"), "") + path.slice(1) : path}</code> does not exist.</p>`
	return file
}

//// Article
/**
 * Fetch and replace the article
 */
function placeArticle() {
	// Get filename and main text
	var filename = location.pathname.split("/").at(-1)!
	filename = filename.substring(0, filename.length - 5)
	const response = findFile(`./${filename}.md`)
	response.then(async text => {
		// Rewrite title
		title.innerHTML = `${filename} | sunrise-sunset.org's API`

		// If file does not exit, return
		if (!text.ok) return

		// Render page
		const html = await text.text()
		article.innerHTML = md.render(html)

		// Fix all anchor tags in article
		fixLinks(article)

		// Get all headings
		let hs: HTMLHeadingElement[] = [...document.querySelectorAll<HTMLHeadingElement>("section > h1, section > h2, section > h3")]
		// Put heading permalink
		hs.forEach(h => {
			// Add ID
			h.id = headingToAnchor(h.innerText)
			// Add permalink
			h.insertAdjacentHTML("afterbegin", `<button type="button" class="permalink"><img src="${deploymentPath ? "/sunrise-sunset.org" : ""}/wiki/resources/images/icons/permalink.svg" alt="¶"></button>`)
		})
		for (const button of document.querySelectorAll<HTMLButtonElement>(".permalink")) {
			button.addEventListener("click", () => {
				// Copy link
				navigator.clipboard.writeText(location.origin + location.pathname + "#" + headingToAnchor(button.parentElement!.innerText))
			})
		}

		// Wrap table of content in a div
		const flexDiv = document.createElement("div")
		flexDiv.className = "flex"
		for (const ul of document.querySelectorAll("h3 + ul")) {
			const div = document.createElement("div")
			div.className = "table-of-content"
			ul.insertAdjacentElement("afterend", flexDiv)
			div.appendChild(ul.previousElementSibling!)
			div.appendChild(ul)
			flexDiv.appendChild(div)
		}

		// Go to element if hash exists
		const hash = location.hash.slice(1)
		if (hash) document.getElementById(hash)!.scrollIntoView()
	})
	return response
}

// When user goes back, get and place the article
window.addEventListener("popstate", async () => {
	await placeArticle()
	setTimeout(() => {
		setupAnchors()
		setupScrollbar()
	}, 10)
})

// Get an place the article
const articleResponse = placeArticle()

//// Header
const headerResponse = findFile("/wiki/header.html")
headerResponse.then(async text => {
	if (!text.ok) return

	// Add header
	const html = await text.text()
	main.insertAdjacentHTML("beforebegin", html)
	const header = document.getElementsByTagName("header")[0]

	// Fix all anchor tags in header
	fixLinks(header)

	// Execute header.js
	var headerJS = await findFile("/wiki/scripts/dir/header.js")
	if (!headerJS.ok) return
	eval(await headerJS.text())
})

//// Aside
const asideResponse = findFile("/wiki/aside.html")
asideResponse.then(async text => {
	if (!text.ok) return

	// Add aside
	const html = await text.text()
	main.insertAdjacentHTML("afterbegin", html)
	const aside = document.getElementsByTagName("aside")[0]

	// Fix all anchor tags in aside
	fixLinks(aside)

	// Details and summary
	for (const details of aside.getElementsByTagName("details")) {
		// Summary
		(<HTMLElement> details.firstElementChild!).addEventListener("click", () => {
			// Change class
			details.className = details.className === "close" ? "open" : "close"

			// Open next details if there is only 1 inside
			checkNextDetails(details)
		})

		// Stop default adding open attribute
		details.addEventListener("click", event => {
			event.preventDefault()
		})

		// Make all open so that elements are visible but not displayed
		details.open = true
		details.className = "close"
	}

	// Anchor
	for (const a of aside.getElementsByTagName("a")) {
		// Do not open or close when the link is pressed
		a.addEventListener("click", event => {
			event.stopPropagation()
		})
	}

	articleResponse.then(() => {
		// Redo the anchor tag
		setupAnchors(false)
	})
})

//// Footer
findFile("/wiki/footer.html")
	.then(async text => {
		if (!text.ok) return

		// Add footer
		const html = await text.text()
		main.insertAdjacentHTML("afterend", html)
		const footer = document.getElementsByTagName("footer")[0]

		// Fix all anchor tags in footer
		fixLinks(footer)

		// When everything has been loaded
		await headerResponse
		await articleResponse
		await asideResponse
		setupScrollbar()
	})


/**
 * Event when clicking a link that is the same as the location's href
 */
function aSamePage(event: MouseEvent) {
	event.preventDefault()
	const hamburgerInput = <HTMLInputElement> document.getElementById("hamburger")
	hamburgerInput.checked = false
}

/**
 * Event when clicking a link that goes to a different page
 */
function aDifferentLink(this: HTMLAnchorElement, event: MouseEvent) {
	event.preventDefault()
	const hamburgerInput = <HTMLInputElement> document.getElementById("hamburger")
	const dim = <HTMLDivElement> document.getElementById("dim")

	// Before loading
	history.pushState("", "", this.href)
	dim.style.backgroundColor = "white"
	dim.style.animation = "breath 1.5s infinite"
	placeArticle()
		.then(() => {
			// After loading
			dim.style.animation = ""
			dim.style.backgroundColor = ""
			hamburgerInput.checked = false
			setTimeout(() => {
				setupAnchors()
				setupScrollbar()
			}, 10)
		})
}

/**
 * Setup anchor tags
 */
function setupAnchors(removePrevious: boolean = true) {
	// Remove previous event listener
	if (removePrevious) {
		for (const a of document.getElementsByTagName("a")) {
			if (!a.getAttribute("href")!.startsWith("http") && !a.getAttribute("href")!.startsWith("#")) {
				// Remove all event listeners
				a.removeEventListener("click", aSamePage)
				a.removeEventListener("click", aDifferentLink)
			}
		}
	}

	// Add event listener
	for (const a of document.getElementsByTagName("a")) {
		if (a.getAttribute("href")!.startsWith("#")) {
			// Redo scroll into view for anchors with #
			a.addEventListener("click", event => {
				event.preventDefault()
				document.getElementById(a.getAttribute("href")!.slice(1))!.scrollIntoView()
				history.pushState("", "", location.origin + location.pathname + a.getAttribute("href"))
			})
		} else if (!a.getAttribute("href")!.startsWith("http")) {
			// If the link is the same as the location's href
			if (a.href === location.href) a.addEventListener("click", aSamePage)
			else a.addEventListener("click", aDifferentLink)
		}
	}
}

/**
 * Setup scrollbar
 */
function setupScrollbar() {
	const thumb = <HTMLDivElement> document.getElementById("thumb")

	// Add scrollbar if needed
	if (document.body.clientHeight > window.innerHeight) {
		// Set the height of the thumb
		thumb.style.height = window.innerHeight * window.innerHeight / document.body.clientHeight + "px"
	} else {
		thumb.style.height = ""
	}
}

/**
 * Check if there is only one details inside the details. If so, then open it and repeat again for the next one
 * @param details The details to check
 */
function checkNextDetails(details: HTMLDetailsElement) {
	const next = (<HTMLDivElement> (<HTMLDivElement> details.lastElementChild!).firstElementChild!).firstElementChild!
	if (next.tagName === "DETAILS" && next.nextElementSibling === null) {
		next.className = details.className
		checkNextDetails(<HTMLDetailsElement> next)
	}
}

/**
 * Fixes anchor and image links
 * @param searchIn The element to search for anchor links in
 */
function fixLinks(searchIn: Document | HTMLElement) {
	// Fix anchors
	for (const a of searchIn.getElementsByTagName("a")) {
		const href = a.getAttribute("href")!
		if (href.startsWith("http") || href.startsWith("#")) continue

		if (deploymentPath) {
			if (href.startsWith("./")) a.setAttribute("href", location.pathname.split("/").slice(0, -1).join("/") + href.slice(1))
			else a.setAttribute("href", "/sunrise-sunset.org" + href)
		}
	}

	// Fix images
	for (const img of searchIn.getElementsByTagName("img")) {
		const src = img.getAttribute("src")!
		if (src.startsWith("http")) continue

		if (deploymentPath) img.setAttribute("src", "/sunrise-sunset.org" + src)
	}
}