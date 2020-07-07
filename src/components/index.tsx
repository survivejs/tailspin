import * as elements from "typed-html";
import Page from "../_layouts/page";
import Alert from "../_components/alert";
import Button from "../_components/button";
import { Navigation, NavigationItem } from "../_components/navigation";

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
        <h1>Available components</h1>

        <div class="mb-4">
          <h2>Alert</h2>
          <Alert>This is a demo alert</Alert>
        </div>

        <div class="mb-4">
          <h2>Button</h2>
          <div x-state="false">
            <div class="mb-4">
              Value: <span x="state" />
            </div>
            <div>
              <Button onclick="setState(v => !v)">Demo button</Button>
            </div>
          </div>
        </div>

        <div>
          <h2>Navigation</h2>
          <Navigation>
            <div class="text-sm lg:flex-grow">
              <NavigationItem href="/">Documentation</NavigationItem>
              <NavigationItem href="/components">Components</NavigationItem>
            </div>
            <div>
              <NavigationItem href="https://github.com/survivejs/tailwind-webpack-starter">
                Download
              </NavigationItem>
              <NavigationItem
                href="https://github.com/survivejs/tailwind-webpack-starter"
                cls="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white"
              >
                Download
              </NavigationItem>
            </div>
          </Navigation>
        </div>
      </main>
    }
  />
);
