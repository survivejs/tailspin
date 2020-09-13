import { expandGlobSync } from "https://deno.land/std/fs/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import * as elements from "../../src/elements.ts";
import BlogIndexLayout from "../../ds/layouts/blog-index.tsx";
import { BlogPage } from "../../ds/layouts/blog-page.tsx";
import { processMarkdown } from "../../utils/process-markdown.ts";

const BlogIndexPage = (props: { url: string }) => (
  <BlogIndexLayout {...props} pages={getPages()} />
);

BlogIndexPage.title = "Blog";
BlogIndexPage.meta = {
  description: "Blog index",
};

function getPages() {
  const ret: BlogPage[] = [];

  for (
    const file of expandGlobSync(
      path.posix.join(Deno.cwd(), "data/blog/**/*.md"),
    )
  ) {
    const markdown = Deno.readTextFileSync(file.path);

    console.log("markdown", markdown, "path", file.path);

    // @ts-ignore: Figure out how to pass BlogPage type through
    ret.push(processMarkdown(markdown));
  }

  return ret;
}

export default BlogIndexPage;
