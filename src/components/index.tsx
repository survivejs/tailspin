import * as elements from "typed-html";
import Page from "../_layouts/page";
import Box, * as BoxMeta from "../_primitives/box";
import * as FlexMeta from "../_primitives/flex";
import * as ButtonMeta from "../_primitives/button";
import Heading, * as HeadingMeta from "../_primitives/heading";
import Link, * as LinkMeta from "../_primitives/link";
import Alert from "../_patterns/alert";
import { Navigation, NavigationItem } from "../_patterns/navigation";

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
      <Box as="main">
        <Box as="article" sx="w-full mx-auto prose lg:prose-xl">
          <Heading as="h1">Available components</Heading>

          <Heading as="h2">Primitives</Heading>

          <Box mb="4">
            <Heading as="h3">{BoxMeta.displayName}</Heading>
            <BoxMeta.Example />
          </Box>

          <Box mb="4">
            <Heading as="h3">{FlexMeta.displayName}</Heading>
            <FlexMeta.Example />
          </Box>

          <Box mb="4">
            <Heading as="h3">{ButtonMeta.displayName}</Heading>
            <ButtonMeta.Example />
          </Box>

          <Box mb="4">
            <Heading as="h3">{HeadingMeta.displayName}</Heading>
            <HeadingMeta.Example />
          </Box>

          <Box mb="4">
            <Heading as="h3">{LinkMeta.displayName}</Heading>
            <LinkMeta.Example />
          </Box>

          <Heading as="h2">Patterns</Heading>

          <Box mb="4">
            <Heading as="h3">Alert</Heading>
            <Alert>This is a demo alert</Alert>
          </Box>

          <Box>
            <Heading as="h3">Navigation</Heading>
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
        </Box>
      </Box>
    }
  />
);
