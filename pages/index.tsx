import { elements, processMarkdown } from "../deps.ts";
import PageLayout from "../ds/layouts/Page.tsx";
import Alert from "../ds/patterns/Alert.tsx";
import Heading from "../ds/primitives/Heading.tsx";
import Box from "../ds/primitives/Box.tsx";
import Stack from "../ds/primitives/Stack.tsx";
import Button from "../ds/primitives/Button.tsx";

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

IndexPage.title = "tailspin";
IndexPage.meta = {
  description: "tailspin is a site generator and design system in one",
};

export default IndexPage;
