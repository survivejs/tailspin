import * as elements from "typed-html";
import Page from "./_layouts/page";
import Alert from "./_components/alert";
import Button from "./_components/button";

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
        <div class="w-full mx-auto">
          <h1>tailwind-webpack-starter</h1>
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
        </div>
      </main>
    }
  />
);
