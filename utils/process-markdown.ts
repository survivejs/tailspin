import marked from "marked";
import hljs from "highlight.js";
import sanitizeHtml from "sanitize-html";

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

function processMarkdown(input) {
  return sanitizeHtml(marked(input));
}

export default processMarkdown;
