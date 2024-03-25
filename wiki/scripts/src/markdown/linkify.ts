import type { Options } from "markdown-it/lib/index"
import type Renderer from "markdown-it/lib/renderer"
import type Token from "markdown-it/lib/token"
import md, { proxy } from "./index.js"

const nameToLink = {
	"Date": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date",

}

const defaultHeadingOpenRenderer = md.renderer.rules["heading_open"] || proxy
/**
 * <h2><code>
 * Add links to code tags that are in h2
 * @param tokens List of all tokens being parsed
 * @param idx Number that corresponds to the key of the current token in tokens
 * @param options The options defined when creating the new markdown-it object ({} in our case)
 * @param self A reference to the renderer itself
 */
md.renderer.rules["heading_open"] = function(tokens: Token[], idx: number, options: Options, env: any, self: Renderer): string {
	if (tokens[idx + 1].children![0].type === "code_inline") {
		const text = tokens[idx + 1].children![0].content
		const property = text.split(":")[0]
		tokens[idx + 1].children![0].content = property + ": "

		let returns = text.split(":")[1].trim()

		Object.keys(nameToLink).forEach(name => {

			returns = returns.replace(name, `[${name}](${nameToLink[name as keyof typeof nameToLink]})`)
		})
		tokens[idx + 1].children![0].content = property + ": " + md.render(returns)
	}
	return defaultHeadingOpenRenderer(tokens, idx, options, env, self)
}