import { readJsonSync } from "https://deno.land/std/fs/mod.ts";
import * as elements from "../../src/elements.ts";
import PageLayout from "./page.tsx";
import Tag from "../patterns/tag.tsx";
import Box from "../primitives/box.tsx";
import Flex from "../primitives/flex.tsx";
import Stack from "../primitives/stack.tsx";
import Heading from "../primitives/heading.tsx";
import Text from "../primitives/text.tsx";

// @ts-ignore: How to use the JSON schema here?
const { name } = readJsonSync("../package.json");

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
