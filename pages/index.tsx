import * as elements from "../src/elements.ts";
import PageLayout from "../ds/layouts/page.tsx";
import Alert from "../ds/patterns/alert.tsx";
import Heading from "../ds/primitives/heading.tsx";
import Box from "../ds/primitives/box.tsx";
import Stack from "../ds/primitives/stack.tsx";
import Button from "../ds/primitives/button.tsx";
import { processMarkdown } from "../utils/process-markdown.ts";

const readme = processMarkdown(
  Deno.readTextFileSync(Deno.cwd() + "/README.md"),
);

const IndexPage = (props: { url: string }) => (
  <PageLayout
    {...props}
    body={<Box as="article" m="8" mx="auto" w="full" class="prose lg:prose-xl">
      {readme.content}
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
    </Box>}
  />
);

IndexPage.title = "";
IndexPage.meta = {
  description:
    "tailwind-webpack-starter combines webpack with Tailwind and provides a starting point for site projects",
};

export default IndexPage;
