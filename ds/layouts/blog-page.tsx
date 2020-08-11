import * as elements from "typed-html";
import PageLayout from "./page";
import Tag from "../patterns/tag";
import Box from "../primitives/box";
import Flex from "../primitives/flex";
import Heading from "../primitives/heading";

// TODO: Add types
const BlogPageLayout = ({ cssTags, jsTags, htmlAttributes, url, content }) => (
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
      <Box as="article" m="8" sx="w-full mx-auto prose lg:prose-xl">
        <Heading as="h1">{content?.title}</Heading>
        <Box sx="space-y-8">
          <Flex direction="row">
            {content?.categories
              .map((category) => <Tag>{category}</Tag>)
              .join(", ")}
          </Flex>
          <Box>{content?.article}</Box>
          <Flex direction="row" sx="justify-between text-sm">
            <Box>{content?.author}</Box>
            <Box>
              {content?.date
                ? new Intl.DateTimeFormat("en", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(content.date))
                : ""}
            </Box>
          </Flex>
        </Box>
      </Box>
    }
  />
);

export const displayName = "BlogPageLayout";
export const Example = () => (
  <BlogPageLayout cssTags="" jsTags="" htmlAttributes="" url="/" content="" />
);

export default BlogPageLayout;
