import {
  elements,
  expandGlobSync,
  joinPath,
  processMarkdown,
} from "../../deps.ts";
import BlogIndexLayout from "../../ds/layouts/blog-index.tsx";
import { BlogPage } from "../../ds/layouts/blog-page.tsx";

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
      joinPath(Deno.cwd(), "data/blog/**/*.md"),
    )
  ) {
    ret.push(processMarkdown(Deno.readTextFileSync(file.path)));
  }

  return ret;
}

export default BlogIndexPage;
