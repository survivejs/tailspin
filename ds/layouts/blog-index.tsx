import * as elements from "typed-html";
import PageLayout from "./page";
import Tag from "../patterns/tag";
import Box from "../primitives/box";
import Flex from "../primitives/flex";
import Heading from "../primitives/heading";
import Link from "../primitives/link";

// TODO: Add types
const BlogIndexLayout = ({
  cssTags,
  jsTags,
  htmlAttributes,
  url,
  attributes,
}) => (
  <PageLayout
    cssTags={cssTags}
    jsTags={jsTags}
    htmlAttributes={htmlAttributes}
    url={url}
    head={[
      <title>tailwind-webpack-starter</title>,
      <meta
        name="description"
        content="tailwind-webpack-starter combines webpack with Tailwind and provides a starting point for site projects"
      ></meta>,
    ]}
    body={
      <Box as="article" mx="auto" mb="8" sx="w-full lg:w-2/3 lg:max-w-2xl">
        <Heading level={1} size="4xl">
          Blog pages
        </Heading>
        <Flex direction="column" sx="prose lg:prose-xl">
          {attributes.pages
            .map(({ title, description, slug, categories }) => (
              <Flex as="section" direction="column">
                <Heading level={2} size="2xl">
                  <Link href={slug}>{title}</Link>
                </Heading>
                <Box>{description}</Box>
                <Flex direction="row" sx="space-x-2">
                  {categories.map((category) => <Tag>{category}</Tag>).join("")}
                </Flex>
              </Flex>
            ))
            .join("")}
        </Flex>
      </Box>
    }
  />
);

export const displayName = "BlogIndexLayout";
export const Example = () => (
  <BlogIndexLayout
    cssTags=""
    jsTags=""
    htmlAttributes=""
    url="/"
    attributes={{
      pages: [
        {
          title: "Demo post",
          categories: ["demo", "testing"],
          description: "This is a demo post",
          body: "Demo post content goes here",
          author: "John Doe",
          date: "2020-08-12T13:19:52.922Z",
          slug: "demo-post",
        },
      ],
    }}
  />
);

export default BlogIndexLayout;
