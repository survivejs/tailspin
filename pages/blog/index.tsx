import * as elements from "../../src/elements.ts";
import BlogIndexLayout from "../../ds/layouts/blog-index.tsx";

const BlogIndexPage = (props: { url: string }) => (
  <BlogIndexLayout {...props} pages={[]} />
);

BlogIndexPage.title = "Blog";
BlogIndexPage.meta = {
  description: "Blog index",
};

export default BlogIndexPage;
