import "highlight.js/styles/dracula.css";

const hljs = require("highlight.js/lib/core.js");
const html = require("highlight.js/lib/languages/xml");
const js = require("highlight.js/lib/languages/javascript");

hljs.registerLanguage("html", html);
hljs.registerLanguage("javascript", js);

function highlight(language: string, str: string) {
  return hljs.highlight(language, str).value;
}

declare global {
  interface Window {
    highlight: typeof highlight;
  }
}

window.highlight = highlight;
