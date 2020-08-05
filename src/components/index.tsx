import * as elements from "typed-html";
import Page from "../_layouts/page";
import Alert from "../_components/alert";
import Box from "../_components/box";
import Flex from "../_components/flex";
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
        <article class="w-full mx-auto prose lg:prose-xl">
          <h1>Available components</h1>

          <h2>Primitives</h2>

          <div class="mb-4">
            <h3>Box</h3>
            <Box p={4} color="white" bg="primary">
              Beep
            </Box>
          </div>

          <div class="mb-4">
            <h3>Flex</h3>
            <Flex>
              <Box p={2} bg="primary" sx={{ flex: "1 1 auto" }}>
                Flex
              </Box>
              <Box p={2} bg="muted">
                Box
              </Box>
            </Flex>
          </div>

          <h2>Patterns</h2>

          <div class="mb-4">
            <h3>Alert</h3>
            <Alert>This is a demo alert</Alert>
          </div>

          <div class="mb-4">
            <h3>Button</h3>
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
            <h3>Navigation</h3>
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
        </article>
      </main>
    }
  />
);
