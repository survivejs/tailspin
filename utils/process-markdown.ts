// Reference: https://deno.land/x/pagic@v0.9.1/src/plugins/md.tsx
import fm from "https://dev.jspm.io/front-matter@4.0.2";
import MarkdownIt from "https://dev.jspm.io/markdown-it@11.0.0";

// TODO: Customize and add highlighting (highlight.js?)
const mdRenderer = new MarkdownIt({
  html: true,
});

function processMarkdown(source: string) {
  const { body, attributes: meta } = fm(source);

  return { content: mdRenderer.render(body).trim(), meta };
}

export { processMarkdown };
