import * as elements from "typed-html";
import PageLayout from "./page";
import Tag from "../patterns/tag";
import Box from "../primitives/box";
import Flex from "../primitives/flex";
import Stack from "../primitives/stack";
import Heading from "../primitives/heading";
import Text from "../primitives/text";
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
      <Box as="article" m="8" mx="auto" w="full" sx="prose lg:prose-xl">
        <Heading level={1} size="4xl">
          {attributes.title}
        </Heading>
        <Stack direction="column" spacing="8">
          <Stack direction="row" spacing="2">
            {attributes.categories
              .map((category) => <Tag>{category}</Tag>)
              .join("")}
          </Stack>
          <Box>{attributes.body}</Box>
          <Flex direction="row" sx="justify-between">
            <Text size="sm">{attributes.author}</Text>
            <Text size="sm">
              {new Intl.DateTimeFormat("en", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(attributes.date))}
            </Text>
          </Flex>
        </Stack>
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
