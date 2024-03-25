import md, { proxy } from "./index.js";
var firstSection = false;
const defaultHeadingOpenRenderer = md.renderer.rules["heading_open"] || proxy;
md.renderer.rules["heading_open"] = function (tokens, idx, options, env, self) {
    if (tokens[idx].tag === "h1" && (tokens[idx + 3].tag === "h2" || tokens[idx + 1].children[0].content === "Value")) {
        if (!firstSection) {
            firstSection = true;
            return "<section>" + defaultHeadingOpenRenderer(tokens, idx, options, env, self);
        }
        return "</section><section>" + defaultHeadingOpenRenderer(tokens, idx, options, env, self);
    }
    return defaultHeadingOpenRenderer(tokens, idx, options, env, self);
};
