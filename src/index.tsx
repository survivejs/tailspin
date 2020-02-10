import * as elements from "typed-html";
import Page from "./_layouts/page";
import Button from "./_components/button";

// TODO: Figure out how to inject sidewind attributes.
// Maybe attribute naming has to change?
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
      <main class="w-full md:w-2/3 md:max-w-2xl mx-auto">
        <h1>tailwind-webpack-starter</h1>
        <p>TODO</p>
        <div x-state="false">
          Value: <span x-value="state" />
        </div>
        <Button label="Demo button" />
      </main>
    }
  />
);
