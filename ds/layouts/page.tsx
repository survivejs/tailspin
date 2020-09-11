import { readJsonSync } from "https://deno.land/std/fs/mod.ts";
import * as elements from "../../src/elements.ts";
import { Navigation, NavigationItem } from "../patterns/navigation.tsx";
import Box from "../primitives/box.tsx";
import Flex from "../primitives/flex.tsx";
import Link from "../primitives/link.tsx";
import Text from "../primitives/text.tsx";

// @ts-ignore: How to use the JSON schema here?
const { name } = readJsonSync("../package.json");

// TODO: Add types
const PageLayout = ({ head, body, cssTags, jsTags, htmlAttributes, url }) => (
  <html {...htmlAttributes}>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {head}
      {cssTags}
    </head>
    <body>
      <Box as="header" bg="primary" color="white">
        <Navigation
          logo={
            <NavigationItem href="/" isSelected={url === "/"}>
              {name}
            </NavigationItem>
          }
        >
          <Box sx="lg:flex-grow">
            <NavigationItem href="/blog/" isSelected={url === "/blog/"}>
              Blog
            </NavigationItem>
            <NavigationItem
              href="/design-system/"
              isSelected={url === "/design-system/"}
            >
              Design system
            </NavigationItem>
          </Box>
          <Box>
            <NavigationItem href="https://github.com/survivejs/tailwind-webpack-starter">
              <Box
                px="4"
                py="2"
                color="white"
                sx="inline-block leading-none border rounded border-white hover:border-transparent hover:text-teal-500 hover:bg-white"
              >
                <Text size="sm">Star at GitHub</Text>
              </Box>
            </NavigationItem>
          </Box>
        </Navigation>
      </Box>
      <Box as="main" m="4">
        {body}
      </Box>
      <Flex
        p="6"
        direction="row"
        color="white"
        bg="primary"
        sx="items-center justify-between flex-wrap"
      >
        <Box as="p">
          Created by{" "}
          <Link.withExternal href="https://twitter.com/bebraw">
            Juho Vepsäläinen
          </Link.withExternal>
        </Box>
      </Flex>
    </body>
    {jsTags}
  </html>
);

export const displayName = "PageLayout";
export const Example = () => (
  <PageLayout
    head=""
    body="Hello from body"
    cssTags=""
    jsTags=""
    htmlAttributes=""
    url="/"
  />
);

export default PageLayout;
