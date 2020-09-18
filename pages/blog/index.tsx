import { elements } from "../../deps.ts";
import BlogIndexLayout from "../../ds/layouts/blog-index.tsx";
import { BlogPage } from "../../ds/layouts/blog-page.tsx";

// TODO: Figure out a good way to handle page typing (needs a generic)
const BlogIndexPage = (props: { url: string; pages: BlogPage[] }) => (
  <BlogIndexLayout {...props} />
);

BlogIndexPage.title = "Blog";
BlogIndexPage.meta = {
  description: "Blog index",
};

export default BlogIndexPage;
