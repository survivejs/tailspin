import { Marked } from "https://deno.land/x/markdown@v2.0.0/mod.ts";
// import hljs from "highlight.js";

/*
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

/*
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
*/

// TODO: Apply syntax highlighting - https://github.com/ubersl0th/markdown
function processMarkdown(source: string) {
  try {
    return Marked.parse(source);
  } catch (err) {
    console.error("processMarkdown - Failed to parse", source);

    return {
      content: "",
      meta: {},
    };
  }
}

export { processMarkdown };
