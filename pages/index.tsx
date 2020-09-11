import { readJsonSync } from "https://deno.land/std/fs/mod.ts";
import * as elements from "../src/elements.ts";
import PageLayout from "../ds/layouts/page.tsx";
import Alert from "../ds/patterns/alert.tsx";
import Heading from "../ds/primitives/heading.tsx";
import Box from "../ds/primitives/box.tsx";
import Stack from "../ds/primitives/stack.tsx";
import Button from "../ds/primitives/button.tsx";
import { processMarkdown } from "../utils/process-markdown.ts";

// @ts-ignore: How to use the JSON schema here?
const { name } = readJsonSync("../package.json");

const readme = Deno.readTextFileSync("../README.md");
const readmeAsHtml = processMarkdown(readme);

const IndexPage = (props: any) => (
  <PageLayout
    {...props}
    head={[
      <title>{name}</title>,
      <meta
        name="description"
        content="tailwind-webpack-starter combines webpack with Tailwind and provides a starting point for site projects"
      ></meta>,
    ]}
    body={
      <Box as="article" m="8" mx="auto" w="full" sx="prose lg:prose-xl">
        {readmeAsHtml}
        <Heading level={2} size="2xl">
          Demo
        </Heading>
        <Stack x-state="false" direction="column" spacing="4">
          <Box as="span" mr="1">
            Value: <Box as="span" x="state" />
          </Box>
          <Alert variant="info">This is a demo alert</Alert>
          <Button variant="primary" onclick="setState(v => !v)">
            Demo button
          </Button>
        </Stack>
      </Box>
    }
  />
);

export default IndexPage;
