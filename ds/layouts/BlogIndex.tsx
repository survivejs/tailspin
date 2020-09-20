import { elements, joinPath } from "../../deps.ts";
import PageLayout from "./Page.tsx";
import Tag from "../patterns/Tag.tsx";
import Box from "../primitives/Box.tsx";
import Flex from "../primitives/Flex.tsx";
import Stack from "../primitives/Stack.tsx";
import Heading from "../primitives/Heading.tsx";
import Link from "../primitives/Link.tsx";
import type { BlogPage } from "./BlogPage.tsx";

export type BlogIndexLayoutProps = {
  url: string;
  pages: BlogPage[];
};

const BlogIndexLayout = ({
  url,
  pages,
}: BlogIndexLayoutProps) => (
  <PageLayout
    url={url}
    body={<Box
      as="article"
      mx="auto"
      mb="8"
      w={{ default: "full", lg: "2/3" }}
      maxw={{ lg: "2xl" }}
    >
      <Heading level={1} size="4xl">
        Blog pages
      </Heading>
      <Flex direction="column" class="prose lg:prose-xl">
        {pages
          .map(({ meta: { title, description, slug, categories } }) => (
            <Flex as="section" direction="column">
              <Heading level={2} size="2xl">
                {/* @ts-ignore */}
                <Link href={joinPath(url, slug)}>{title}</Link>
              </Heading>
              <Box>{description}</Box>
              <Stack direction="row" spacing="2">
                {categories.map((category) => <Tag>{category}</Tag>).join("")}
              </Stack>
            </Flex>
          ))
          .join("")}
      </Flex>
    </Box>}
  />
);

export const displayName = "BlogIndexLayout";
export const Example = () => (
  <BlogIndexLayout
    url="/"
    pages={[
      {
        url: "demo-post",
        content: "Demo post content goes here",
        meta: {
          title: "Demo post",
          categories: ["demo", "testing"],
          description: "This is a demo post",
          author: "John Doe",
          date: "2020-08-12T13:19:52.922Z",
          slug: "demo-post",
        },
      },
    ]}
  />
);

export default BlogIndexLayout;
