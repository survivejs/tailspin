import marked from "marked";
import hljs from "highlight.js";
import sanitizeHtml from "sanitize-html";
import frontmatter from "front-matter";
import removeMarkdown from "remove-markdown";

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, language) {
    const validLanguage = hljs.getLanguage(language) ? language : "plaintext";

    return hljs.highlight(validLanguage, code).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

function processMarkdownWithFrontmatter(source) {
  const result: { [key: string]: any } = frontmatter(source);

  result.attributes = result.attributes || {};
  result.attributes.description =
    result.attributes.description ||
    generateDescription(result, result.attributes.body);
  result.attributes.body = processMarkdown(result.body);

  return { ...result.attributes, body: result.body };
}

function generateDescription(file, body) {
  let ret = body;

  if (file.attributes && file.attributes.preview) {
    ret = file.attributes.preview;
  }

  return `${removeMarkdown(ret).slice(0, 100)}…`;
}

function processMarkdown(source) {
  return sanitizeHtml(marked(source), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["h1", "h2"]),
  });
}

export { processMarkdownWithFrontmatter, processMarkdown };
