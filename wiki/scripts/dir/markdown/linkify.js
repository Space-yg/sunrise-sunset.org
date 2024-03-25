import md, { proxy } from "./index.js";
const nameToLink = {
    "Date": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date",
};
const defaultHeadingOpenRenderer = md.renderer.rules["heading_open"] || proxy;
md.renderer.rules["heading_open"] = function (tokens, idx, options, env, self) {
    if (tokens[idx + 1].children[0].type === "code_inline") {
        const text = tokens[idx + 1].children[0].content;
        const property = text.split(":")[0];
        tokens[idx + 1].children[0].content = property + ": ";
        let returns = text.split(":")[1].trim();
        Object.keys(nameToLink).forEach(name => {
            returns = returns.replace(name, `[${name}](${nameToLink[name]})`);
        });
        tokens[idx + 1].children[0].content = property + ": " + md.render(returns);
    }
    return defaultHeadingOpenRenderer(tokens, idx, options, env, self);
};
