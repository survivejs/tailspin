import * as elements from "typed-html";
import Page from "../layouts/page";

export default (
  <Page
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

        <p>Another page</p>
      </main>
    }
  />
);
