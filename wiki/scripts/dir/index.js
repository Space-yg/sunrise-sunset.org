import { headingToAnchor } from "./helpers.js";
import md from "./markdown.js";
const main = document.getElementsByTagName("main")[0];
const article = document.getElementsByTagName("article")[0];
const title = document.getElementsByTagName("title")[0];
const deploymentPath = location.pathname.split("/")[1] === "sunrise-sunset.org";
function placeArticle() {
    var filename = location.pathname.split("/").at(-1);
    filename = filename.substring(0, filename.length - 5);
    const response = findFile(`./${filename}.md`);
    response.then(async (text) => {
        title.innerHTML = `${filename} | sunrise-sunset.org's API`;
        if (!text.ok)
            return;
        const html = await text.text();
        article.innerHTML = md.render(html);
        fixLinks(article);
        let hs = [...document.querySelectorAll("section > h1, section > h2, section > h3")];
        hs.forEach(h => {
            h.id = headingToAnchor(h.innerText);
            h.insertAdjacentHTML("afterbegin", `<button type="button" class="permalink"><img src="${deploymentPath ? "/sunrise-sunset.org" : ""}/wiki/resources/images/icons/permalink.svg" alt="¶"></button>`);
        });
        for (const button of document.querySelectorAll(".permalink")) {
            button.addEventListener("click", () => {
                navigator.clipboard.writeText(location.origin + location.pathname + "#" + headingToAnchor(button.parentElement.innerText));
            });
        }
        const flexDiv = document.createElement("div");
        flexDiv.className = "flex";
        for (const ul of document.querySelectorAll("h3 + ul")) {
            const div = document.createElement("div");
            div.className = "table-of-content";
            ul.insertAdjacentElement("afterend", flexDiv);
            div.appendChild(ul.previousElementSibling);
            div.appendChild(ul);
            flexDiv.appendChild(div);
        }
        const hash = location.hash.slice(1);
        if (hash)
            document.getElementById(hash).scrollIntoView();
    });
    return response;
}
window.addEventListener("popstate", async () => {
    await placeArticle();
    setTimeout(() => {
        setupAnchors();
        setupScrollbar();
    }, 10);
});
const articleResponse = placeArticle();
const headerResponse = findFile("/wiki/header.html");
headerResponse.then(async (text) => {
    if (!text.ok)
        return;
    const html = await text.text();
    main.insertAdjacentHTML("beforebegin", html);
    const header = document.getElementsByTagName("header")[0];
    fixLinks(header);
    var headerJS = await findFile("/wiki/scripts/dir/header.js");
    if (!headerJS.ok)
        return;
    eval(await headerJS.text());
});
const asideResponse = findFile("/wiki/aside.html");
asideResponse.then(async (text) => {
    if (!text.ok)
        return;
    const html = await text.text();
    main.insertAdjacentHTML("afterbegin", html);
    const aside = document.getElementsByTagName("aside")[0];
    fixLinks(aside);
    for (const details of aside.getElementsByTagName("details")) {
        details.firstElementChild.addEventListener("click", () => {
            details.className = details.className === "close" ? "open" : "close";
            checkNextDetails(details);
        });
        details.addEventListener("click", event => {
            event.preventDefault();
        });
        details.open = true;
        details.className = "close";
    }
    for (const a of aside.getElementsByTagName("a")) {
        a.addEventListener("click", event => {
            event.stopPropagation();
        });
    }
    articleResponse.then(() => {
        setupAnchors(false);
    });
});
findFile("/wiki/footer.html")
    .then(async (text) => {
    if (!text.ok)
        return;
    const html = await text.text();
    main.insertAdjacentHTML("afterend", html);
    const footer = document.getElementsByTagName("footer")[0];
    fixLinks(footer);
    await headerResponse;
    await articleResponse;
    await asideResponse;
    setupScrollbar();
});
async function findFile(path) {
    var file;
    if (path.startsWith("/")) {
        if (deploymentPath)
            file = await fetch(location.origin + "/sunrise-sunset.org" + path);
        else
            file = await fetch(location.origin + path);
    }
    else {
        file = await fetch(path);
    }
    if (!file.ok)
        article.innerHTML = `<p>Woah! That shouldn't happen.</p><p>Please open an issue <a href='https://github.com/Space-yg/sunrise-sunset.org/issues'>here</a> to fix this problem.</p><p>Problem: File <code>${path.startsWith("./") ? location.origin + location.pathname.split("/").slice(0, -1).join("/").replace(path.slice(1).split("/").slice(0, -1).join("/"), "") + path.slice(1) : path}</code> does not exist.</p>`;
    return file;
}
function aSamePage(event) {
    event.preventDefault();
    const hamburgerInput = document.getElementById("hamburger");
    hamburgerInput.checked = false;
}
function aDifferentLink(event) {
    event.preventDefault();
    const hamburgerInput = document.getElementById("hamburger");
    const dim = document.getElementById("dim");
    history.pushState("", "", this.href);
    dim.style.backgroundColor = "white";
    dim.style.animation = "breath 1.5s infinite";
    dim.style.visibility = "visible";
    placeArticle()
        .then(() => {
        dim.style.animation = "";
        dim.style.backgroundColor = "";
        dim.style.visibility = "";
        hamburgerInput.checked = false;
        setTimeout(() => {
            setupAnchors();
            setupScrollbar();
        }, 10);
    });
}
function setupAnchors(removePrevious = true) {
    if (removePrevious) {
        for (const a of document.getElementsByTagName("a")) {
            if (!a.getAttribute("href").startsWith("http") && !a.getAttribute("href").startsWith("#")) {
                a.removeEventListener("click", aSamePage);
                a.removeEventListener("click", aDifferentLink);
            }
        }
    }
    for (const a of document.getElementsByTagName("a")) {
        if (a.getAttribute("href").startsWith("#")) {
            a.addEventListener("click", event => {
                event.preventDefault();
                document.getElementById(a.getAttribute("href").slice(1)).scrollIntoView();
                history.pushState("", "", location.origin + location.pathname + a.getAttribute("href"));
            });
        }
        else if (!a.getAttribute("href").startsWith("http")) {
            if (a.href === location.href)
                a.addEventListener("click", aSamePage);
            else
                a.addEventListener("click", aDifferentLink);
        }
    }
}
function setupScrollbar() {
    const thumb = document.getElementById("thumb");
    if (document.body.clientHeight > window.innerHeight) {
        thumb.style.height = window.innerHeight * window.innerHeight / document.body.clientHeight + "px";
    }
    else {
        thumb.style.height = "";
    }
}
function checkNextDetails(details) {
    const next = details.lastElementChild.firstElementChild.firstElementChild;
    if (next.tagName === "DETAILS" && next.nextElementSibling === null) {
        next.className = details.className;
        checkNextDetails(next);
    }
}
function relativeToAbsolute(path) {
    if (path.startsWith("../")) {
        const count = [...path.matchAll(/\.\.\//g)].length;
        return location.pathname.split("/").slice(0, -count - 1).join("/") + path.slice(count * 3 - 1);
    }
    else if (path.startsWith("./"))
        return location.pathname.split("/").slice(0, -1).join("/") + path.slice(1);
    return path;
}
function fixLinks(searchIn) {
    for (const a of searchIn.getElementsByTagName("a")) {
        const href = a.getAttribute("href");
        if (href.startsWith("http") || href.startsWith("#"))
            continue;
        if (deploymentPath) {
            if (href.startsWith("./") || href.startsWith("../"))
                a.setAttribute("href", relativeToAbsolute(href));
            else
                a.setAttribute("href", "/sunrise-sunset.org" + href);
        }
    }
    for (const img of searchIn.getElementsByTagName("img")) {
        const src = img.getAttribute("src");
        if (src.startsWith("http"))
            continue;
        if (deploymentPath)
            img.setAttribute("src", "/sunrise-sunset.org" + src);
    }
}
