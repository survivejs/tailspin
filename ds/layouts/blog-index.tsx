import * as elements from "typed-html";
import PageLayout from "./page";
import Box from "../primitives/box";

// TODO: Add types
const BlogIndexLayout = (props) => (
  <PageLayout
    {...props}
    head={[
      <title>tailwind-webpack-starter</title>,
      <meta
        name="description"
        content="tailwind-webpack-starter combines webpack with Tailwind and provides a starting point for site projects"
      ></meta>,
    ]}
    body={
      <Box as="article" m="8" sx="w-full mx-auto prose lg:prose-xl">
        Blog index goes here
      </Box>
    }
  />
);

export const displayName = "BlogIndexLayout";
export const Example = () => (
  <BlogIndexLayout
    head=""
    body="Hello from body"
    cssTags=""
    jsTags=""
    htmlAttributes=""
    url="/"
  />
);

export default BlogIndexLayout;
