import md, { proxy } from "./index.js";
const defaultCodeInlineRenderer = md.renderer.rules["code_inline"] || proxy;
md.renderer.rules["code_inline"] = function (tokens, idx, options, env, self) {
    if (tokens[idx + 1] && tokens[idx + 2] && tokens[idx + 1].type === "link_open" && tokens[idx + 2].type === "code_inline") {
        tokens[idx].attrJoin("class", "right-open");
        tokens[idx + 2].attrJoin("class", "left-open");
    }
    return defaultCodeInlineRenderer(tokens, idx, options, env, self);
};
const defaultLinkOpenRenderer = md.renderer.rules["link_open"] || proxy;
md.renderer.rules["link_open"] = function (tokens, idx, options, env, self) {
    if (tokens[idx + 1] && tokens[idx + 3] && tokens[idx + 1].type === "code_inline" && tokens[idx + 3].type === "code_inline") {
        tokens[idx + 1].attrJoin("class", "right-open");
        tokens[idx + 3].attrJoin("class", "left-open");
    }
    return defaultLinkOpenRenderer(tokens, idx, options, env, self);
};
