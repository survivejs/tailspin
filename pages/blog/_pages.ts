import {
  expandGlobSync,
  joinPath,
  processMarkdown,
} from "../../deps.ts";
import { BlogPage } from "../../ds/layouts/blog-page.tsx";

function getPages() {
  const ret: BlogPage[] = [];

  for (
    const file of expandGlobSync(
      joinPath(Deno.cwd(), "data/blog/**/*.md"),
    )
  ) {
    const page = processMarkdown(Deno.readTextFileSync(file.path));

    ret.push({ ...page, url: page.meta.slug });
  }

  return ret;
}

export default getPages;
