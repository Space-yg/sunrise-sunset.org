const md = window.markdownit({
    typographer: true,
});
export const proxy = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);
export default md;
