import * as elements from "../../src/elements.ts";
import PageLayout from "./page.tsx";
import Tag from "../patterns/tag.tsx";
import Box from "../primitives/box.tsx";
import Flex from "../primitives/flex.tsx";
import Stack from "../primitives/stack.tsx";
import Heading from "../primitives/heading.tsx";
import Link from "../primitives/link.tsx";
import { BlogPage } from "./blog-page.tsx";

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
                <Link href={slug}>{title}</Link>
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
