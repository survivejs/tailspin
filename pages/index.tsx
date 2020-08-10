import fs from "fs";
import path from "path";
import * as elements from "typed-html";
import Page from "../ds/layouts/page";
import Alert from "../ds/patterns/alert";
import Heading from "../ds/primitives/heading";
import Box from "../ds/primitives/box";
import Button from "../ds/primitives/button";
import processMarkdown from "./_utils/process-markdown";

const readmePath = path.join(__dirname, "..", "README.md");
const readme = fs.readFileSync(readmePath, { encoding: "utf-8" });
const readmeAsHtml = processMarkdown(readme);

export default ({ htmlAttributes, cssTags, jsTags }) => (
  <Page
    htmlAttributes={htmlAttributes}
    cssTags={cssTags}
    jsTags={jsTags}
    head={[
      <title>tailwind-webpack-starter</title>,
      <meta
        name="description"
        content="tailwind-webpack-starter combines webpack with Tailwind and provides a starting point for site projects"
      ></meta>,
    ]}
    body={
      <Box as="main" m="8">
        <Box as="article" sx="w-full mx-auto prose lg:prose-xl">
          {readmeAsHtml}
          <Heading as="h2">Demo</Heading>
          <Box x-state="false">
            <Box mb="4">
              <Box as="span" mr="1">
                Value:
              </Box>
              <Box as="span" x="state" />
            </Box>
            <Box mb="4">
              <Alert>This is a demo alert</Alert>
            </Box>
            <Box>
              <Button.Primary onclick="setState(v => !v)">
                Demo button
              </Button.Primary>
            </Box>
          </Box>
        </Box>
      </Box>
    }
  />
);
