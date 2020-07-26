import fs from "fs";
import path from "path";
import * as elements from "typed-html";
import Page from "./_layouts/page";
import Alert from "./_components/alert";
import Button from "./_components/button";
import processMarkdown from "./_utils/process-markdown";

const readmePath = path.join(__dirname, "..", "README.md");
const readme = fs.readFileSync(readmePath, { encoding: "utf-8" });
const readmeAsHtml = processMarkdown(readme);

console.log(readmePath, readmeAsHtml);

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
          <h2>Demo</h2>
          <div x-state="false">
            <div class="mb-4">
              Value: <span x="state" />
            </div>
            <div class="mb-4">
              <Alert>This is a demo alert</Alert>
            </div>
            <div>
              <Button onclick="setState(v => !v)">Demo button</Button>
            </div>
          </div>
        </article>
      </main>
    }
  />
);
