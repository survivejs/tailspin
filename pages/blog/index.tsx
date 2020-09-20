import { elements } from "../../deps.ts";
import BlogIndexLayout from "../../ds/layouts/BlogIndex.tsx";
import type { BlogPage } from "../../ds/layouts/BlogPage.tsx";

// TODO: Figure out a good way to handle page typing (needs a generic)
const BlogIndexPage = (props: { url: string; pages: BlogPage[] }) => (
  <BlogIndexLayout {...props} />
);

BlogIndexPage.title = "Blog";
BlogIndexPage.meta = {
  description: "Blog index",
};

export default BlogIndexPage;
