import type { Options } from "markdown-it/lib/index"
import type Renderer from "markdown-it/lib/renderer"
import type Token from "markdown-it/lib/token"
import md, { proxy } from "./index.js"

var firstSection = false

const defaultHeadingOpenRenderer = md.renderer.rules["heading_open"] || proxy
/**
 * <h1>...<h1><h2> or <h1>Value</h1>
 * Add links to code tags that are in h2
 * @param tokens List of all tokens being parsed
 * @param idx Number that corresponds to the key of the current token in tokens
 * @param options The options defined when creating the new markdown-it object ({} in our case)
 * @param self A reference to the renderer itself
 */
md.renderer.rules["heading_open"] = function(tokens: Token[], idx: number, options: Options, env: any, self: Renderer): string {
	// Find <h1>...<h1><h2> or <h1>Value</h1>
	if (tokens[idx].tag === "h1" && (tokens[idx + 3].tag === "h2" || tokens[idx + 1].children![0].content === "Value")) {
		// If it is the first section
		if (!firstSection) {
			firstSection = true
			return "<section>" + defaultHeadingOpenRenderer(tokens, idx, options, env, self)
		}
		// If it is not the first section
		return "</section><section>" + defaultHeadingOpenRenderer(tokens, idx, options, env, self)
	}

	return defaultHeadingOpenRenderer(tokens, idx, options, env, self)
}