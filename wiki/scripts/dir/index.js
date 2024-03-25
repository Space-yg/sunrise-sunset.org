import { headingToAnchor } from "./helpers.js";
import md from "./markdown.js";
const main = document.getElementsByTagName("main")[0];
const article = document.getElementsByTagName("article")[0];
const title = document.getElementsByTagName("title")[0];
async function findFile(path) {
    var file = await fetch(path);
    if (!file.ok)
        article.innerHTML = `<p>Woah! That shouldn't happen.</p><p>Please open an issue <a href='https://github.com/Space-yg/sunrise-sunset.org/issues'>here</a> to fix this problem.</p><p>Problem: File <code>${path.startsWith("./") ? location.origin + location.pathname.split("/").slice(0, -1).join("/").replace(path.slice(1).split("/").slice(0, -1).join("/"), "") + path.slice(1) : path}</code> does not exist.</p>`;
    return file;
}
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
        let hs = [...document.querySelectorAll("section > h1, section > h2, section > h3")];
        hs.forEach(h => {
            h.id = headingToAnchor(h.innerText);
            h.insertAdjacentHTML("afterbegin", "<button type='button' class='permalink'><img src='/wiki/resources/images/icons/permalink.svg' alt='¶'></button>");
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
    placeArticle()
        .then(() => {
        dim.style.animation = "";
        dim.style.backgroundColor = "";
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
window.addEventListener("popstate", async () => {
    await placeArticle();
    setTimeout(() => {
        setupAnchors();
        setupScrollbar();
    }, 10);
});
const articleResponse = placeArticle();
const headerResponse = findFile(`${location.origin}/wiki/header.html`);
headerResponse.then(async (text) => {
    if (!text.ok)
        return;
    const html = await text.text();
    main.insertAdjacentHTML("beforebegin", html);
    var headerJS = await findFile(`${location.origin}/wiki/scripts/dir/header.js`);
    if (!headerJS.ok)
        return;
    eval(await headerJS.text());
});
function checkNextDetails(details) {
    const next = details.lastElementChild.firstElementChild.firstElementChild;
    if (next.tagName === "DETAILS" && next.nextElementSibling === null) {
        next.className = details.className;
        checkNextDetails(next);
    }
}
findFile(`${location.origin}/wiki/aside.html`)
    .then(async (text) => {
    if (!text.ok)
        return;
    const html = await text.text();
    main.insertAdjacentHTML("afterbegin", html);
    const aside = document.getElementsByTagName("aside")[0];
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
findFile(`${location.origin}/wiki/footer.html`)
    .then(async (text) => {
    if (!text.ok)
        return;
    const html = await text.text();
    main.insertAdjacentHTML("afterend", html);
    headerResponse.then(() => {
        articleResponse.then(() => {
            setupScrollbar();
        });
    });
});
