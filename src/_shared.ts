import "highlight.js/styles/dracula.css";
import "sidewind";
import "./index.pcss";

const hljs = require("highlight.js/lib/core.js");
const html = require("highlight.js/lib/languages/xml");
const js = require("highlight.js/lib/languages/javascript");

hljs.registerLanguage("html", html);
hljs.registerLanguage("javascript", js);

function highlight(language, str) {
  return hljs.highlight(language, str).value;
}

// @ts-ignore: TODO: Figure out how to expand the type
window.highlight = highlight;
