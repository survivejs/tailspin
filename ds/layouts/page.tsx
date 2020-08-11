import * as elements from "typed-html";
import Navigation from "../patterns/navigation";
import Box from "../primitives/box";
import Flex from "../primitives/flex";

// TODO: Add types
const Page = ({ head, body, cssTags, jsTags, htmlAttributes, url }) => (
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
            <Navigation.Item href="/" isSelected={url === "/"}>
              Documentation
            </Navigation.Item>
            <Navigation.Item
              href="/design-system/"
              isSelected={url === "/design-system/"}
            >
              Design system
            </Navigation.Item>
          </Box>
          <Box>
            <Navigation.Item href="https://github.com/survivejs/tailwind-webpack-starter">
              <Box sx="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white">
                Star at GitHub
              </Box>
            </Navigation.Item>
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

export const displayName = "Page";
export const Example = () => (
  <Page
    head=""
    body="Hello from body"
    cssTags=""
    jsTags=""
    htmlAttributes=""
    url="/"
  />
);

export default Page;
