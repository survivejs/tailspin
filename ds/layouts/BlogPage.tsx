import { elements } from "../../deps.ts";
import PageLayout from "./Page.tsx";
import Tag from "../patterns/Tag.tsx";
import Box from "../primitives/Box.tsx";
import Flex from "../primitives/Flex.tsx";
import Stack from "../primitives/Stack.tsx";
import Heading from "../primitives/Heading.tsx";
import Text from "../primitives/Text.tsx";

export type BlogPage = {
  url: string;
  content: string;
  meta: {
    title: string;
    categories: string[];
    description: string;
    author: string;
    date: string;
    slug: string;
  };
};

const BlogPageLayout = ({
  url,
  attributes,
}: {
  url: string;
  attributes: BlogPage;
}) => (
  <PageLayout
    url={url}
    body={<Box as="article" m="8" mx="auto" w="full" class="prose lg:prose-xl">
      <Heading level={1} size="4xl">
        {attributes.meta.title}
      </Heading>
      <Stack direction="column" spacing="8">
        <Stack direction="row" spacing="2">
          {attributes.meta.categories
            .map((category) => <Tag>{category}</Tag>)
            .join("")}
        </Stack>
        <Box>{attributes.content}</Box>
        <Flex direction="row" sx="justify-between">
          <Text size="sm">{attributes.meta.author}</Text>
          <Text size="sm">
            {/*new Intl.DateTimeFormat("en", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(attributes.meta.date))*/}
          </Text>
        </Flex>
      </Stack>
    </Box>}
  />
);

export const displayName = "BlogPageLayout";
export const Example = () => (
  <BlogPageLayout
    url="/"
    attributes={{
      url: "demo-post",
      content: "Demo post content goes here",
      meta: {
        title: "Demo post",
        categories: ["demo", "tech", "demo"],
        description: "This is a demo post",
        author: "John Doe",
        date: "2020-08-12T13:19:52.922Z",
        slug: "demo-post",
      },
    }}
  />
);

export default BlogPageLayout;
