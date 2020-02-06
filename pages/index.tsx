import * as elements from "typed-html";
import Page from "../layouts/page";
import Button from "../components/button";

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
      <main>
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
