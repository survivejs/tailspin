import * as elements from "typed-html";
import Page from "../_layouts/page";
import Alert from "../_components/alert";
import Box from "../_components/box";
import Flex from "../_components/flex";
import Button from "../_components/button";
import Link from "../_components/link";
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

          <Box mb={4}>
            <h3>Box</h3>
            <Box m={2} p={4} color="white" bg="primary">
              Beep
            </Box>
          </Box>

          <Box mb={4}>
            <h3>Flex</h3>
            <Flex>
              <Box p={2} bg="primary" sx="flex-auto">
                Flex
              </Box>
              <Box p={2} bg="muted">
                Box
              </Box>
            </Flex>
          </Box>

          <h2>Patterns</h2>

          <Box mb={4}>
            <h3>Alert</h3>
            <Alert>This is a demo alert</Alert>
          </Box>

          <Box mb={4}>
            <h3>Link</h3>
            <Link href="https://github.com/survivejs/tailwind-webpack-starter">
              Download
            </Link>
          </Box>

          <Box mb={4}>
            <h3>Button</h3>
            <Box x-state="false">
              <Box mb={4}>
                Value: <span x="state" />
              </Box>
              <Box>
                <Button onclick="setState(v => !v)">Demo button</Button>
              </Box>
            </Box>
          </Box>

          <Box>
            <h3>Navigation</h3>
            <Navigation>
              <Box sx="text-sm lg:flex-grow">
                <NavigationItem href="/">Documentation</NavigationItem>
                <NavigationItem href="/components">Components</NavigationItem>
              </Box>
              <Box>
                <NavigationItem href="https://github.com/survivejs/tailwind-webpack-starter">
                  Download
                </NavigationItem>
                <NavigationItem href="https://github.com/survivejs/tailwind-webpack-starter">
                  <Box sx="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white">
                    Download
                  </Box>
                </NavigationItem>
              </Box>
            </Navigation>
          </Box>
        </article>
      </main>
    }
  />
);
