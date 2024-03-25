// Edit Markdown rules https://github.com/markdown-it/markdown-it/blob/master/docs/examples/renderer_rules.md
// Use https://markdown-it.github.io/

import MarkdownIt, { Options } from "markdown-it/lib/index"
import Renderer from "markdown-it/lib/renderer"
import Token from "markdown-it/lib/token"

/** MarkdownIt Parser */
const md: MarkdownIt = window.markdownit({
	typographer: true,
})

/** Default token generator */
export const proxy = (tokens: Token[], idx: number, options: Options, env: any, self: Renderer) => self.renderToken(tokens, idx, options)

export default md