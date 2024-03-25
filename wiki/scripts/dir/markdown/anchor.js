import md, { proxy } from "./index.js";
const defaultLinkOpenRenderer = md.renderer.rules["link_open"] || proxy;
md.renderer.rules["link_open"] = function (tokens, idx, options, env, self) {
    for (let i = 1; i < tokens.length - idx - 1; i++) {
        if (tokens[idx + i].type === "link_close") {
            if (tokens[idx + i + 1].content[0] === "~") {
                tokens[idx].attrJoin("target", "_blank");
                tokens[idx + i + 1].content = tokens[idx + i + 1].content.slice(1);
            }
            break;
        }
    }
    if (tokens[idx].attrGet("href").startsWith("http")) {
        tokens[idx].attrJoin("target", "_blank");
    }
    return defaultLinkOpenRenderer(tokens, idx, options, env, self);
};
