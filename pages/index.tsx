import fs from "fs";
import path from "path";
import * as elements from "typed-html";
import PageLayout from "../ds/layouts/page";
import Alert from "../ds/patterns/alert";
import Heading from "../ds/primitives/heading";
import Box from "../ds/primitives/box";
import Stack from "../ds/primitives/stack";
import Button from "../ds/primitives/button";
import { processMarkdown } from "../utils/process-markdown";
import { name } from "../package.json";

const readmePath = path.join(__dirname, "..", "README.md");
const readme = fs.readFileSync(readmePath, { encoding: "utf-8" });
const readmeAsHtml = processMarkdown(readme);

const IndexPage = (props) => (
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
