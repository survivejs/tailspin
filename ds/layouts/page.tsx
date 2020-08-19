import * as elements from "typed-html";
import { Navigation, NavigationItem } from "../patterns/navigation";
import Box from "../primitives/box";
import Flex from "../primitives/flex";

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
        <Navigation>
          <Box sx="text-sm lg:flex-grow">
            <NavigationItem href="/" isSelected={url === "/"}>
              Documentation
            </NavigationItem>
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
              <Box sx="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white">
                Star at GitHub
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
        footer
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
