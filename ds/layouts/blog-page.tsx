import * as elements from "typed-html";
import PageLayout from "./page";
import Tag from "../patterns/tag";
import Box from "../primitives/box";
import Flex from "../primitives/flex";
import Heading from "../primitives/heading";
import { name } from "../../package.json";

// TODO: Add types
const BlogPageLayout = ({
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
      <title>
        {name} - {attributes.title}
      </title>,
      <meta name="description" content={attributes.description}></meta>,
    ]}
    body={
      <Box as="article" m="8" sx="w-full mx-auto prose lg:prose-xl">
        <Heading level={1} size="4xl">
          {attributes.title}
        </Heading>
        <Box sx="space-y-8">
          <Flex direction="row" sx="space-x-2">
            {attributes.categories
              .map((category) => <Tag>{category}</Tag>)
              .join("")}
          </Flex>
          <Box>{attributes.body}</Box>
          <Flex direction="row" sx="justify-between text-sm">
            <Box>{attributes.author}</Box>
            <Box>
              {new Intl.DateTimeFormat("en", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(attributes.date))}
            </Box>
          </Flex>
        </Box>
      </Box>
    }
  />
);

export const displayName = "BlogPageLayout";
export const Example = () => (
  <BlogPageLayout
    cssTags=""
    jsTags=""
    htmlAttributes=""
    url="/"
    attributes={{
      title: "Demo post",
      categories: ["demo", "tech", "demo"],
      description: "This is a demo post",
      body: "Demo post content goes here",
      author: "John Doe",
      date: "2020-08-12T13:19:52.922Z",
    }}
  />
);

export default BlogPageLayout;
