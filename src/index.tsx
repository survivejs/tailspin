import fs from "fs";
import path from "path";
import * as elements from "typed-html";
import Page from "./_layouts/page";
import Heading from "./_primitives/heading";
import Box from "./_primitives/box";
import Alert from "./_patterns/alert";
import Button from "./_patterns/button";
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
      <main class="m-8">
        <article class="w-full mx-auto prose lg:prose-xl">
          {readmeAsHtml}
          <Heading as="h2">Demo</Heading>
          <Box x-state="false">
            <Box mb="4">
              Value: <span x="state" />
            </Box>
            <Box mb="4">
              <Alert>This is a demo alert</Alert>
            </Box>
            <Box>
              <Button onclick="setState(v => !v)" sx="btn-blue">
                Demo button
              </Button>
            </Box>
          </Box>
        </article>
      </main>
    }
  />
);
