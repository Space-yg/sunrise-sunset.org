import type { Options } from "markdown-it/lib/index"
import type Renderer from "markdown-it/lib/renderer"
import type Token from "markdown-it/lib/token"
import md, { proxy } from "./index.js"

const defaultCodeInlineRenderer = md.renderer.rules["code_inline"] || proxy
/**
 * <code>...</code><a><code>...</code></a>
 * Connect code in anchor with code before
 * @param tokens List of all tokens being parsed
 * @param idx Number that corresponds to the key of the current token in tokens
 * @param options The options defined when creating the new markdown-it object ({} in our case)
 * @param self A reference to the renderer itself
 */
md.renderer.rules["code_inline"] = function(tokens: Token[], idx: number, options: Options, env: any, self: Renderer): string {
	// Check the link and code inside and after
	if (tokens[idx + 1] && tokens[idx + 2] && tokens[idx + 1].type === "link_open" && tokens[idx + 2].type === "code_inline") {
		tokens[idx].attrJoin("class", "right-open")
		tokens[idx + 2].attrJoin("class", "left-open")
	}

	// Return the default settings
	return defaultCodeInlineRenderer(tokens, idx, options, env, self)
}

const defaultLinkOpenRenderer = md.renderer.rules["link_open"] || proxy
/**
 * <a><code>...</code></a><code>...</code>
 * Connect code in anchor with code after
 * @param tokens List of all tokens being parsed
 * @param idx Number that corresponds to the key of the current token in tokens
 * @param options The options defined when creating the new markdown-it object ({} in our case)
 * @param self A reference to the renderer itself
 */
md.renderer.rules["link_open"] = function(tokens: Token[], idx: number, options: Options, env: any, self: Renderer): string {
	// Check the codes after
	if (tokens[idx + 1] && tokens[idx + 3] && tokens[idx + 1].type === "code_inline" && tokens[idx + 3].type === "code_inline") {
		tokens[idx + 1].attrJoin("class", "right-open")
		tokens[idx + 3].attrJoin("class", "left-open")
	}

	// Return the default settings
	return defaultLinkOpenRenderer(tokens, idx, options, env, self)
}