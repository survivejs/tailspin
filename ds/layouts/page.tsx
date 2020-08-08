import * as elements from "typed-html";
import Navigation from "../patterns/navigation";
import Box from "../primitives/box";

const Page = ({ head, body, cssTags, jsTags, htmlAttributes }) => (
  <html {...htmlAttributes}>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {head}
      {cssTags}
    </head>
    <body>
      <header>
        <Navigation>
          <Box sx="text-sm lg:flex-grow">
            <Navigation.Item href="/">Documentation</Navigation.Item>
            <Navigation.Item href="/components">Components</Navigation.Item>
          </Box>
          <Box>
            <Navigation.Item href="https://github.com/survivejs/tailwind-webpack-starter">
              <Box sx="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white">
                Star at GitHub
              </Box>
            </Navigation.Item>
          </Box>
        </Navigation>
      </header>
      <main class="m-4">{body}</main>
      <footer class="flex items-center justify-between flex-wrap bg-teal-500 p-6 text-white">
        footer
      </footer>
    </body>
    {jsTags}
  </html>
);

export const displayName = "Page";
export const Example = () => (
  <Page head="" body="Hello from body" cssTags="" jsTags="" htmlAttributes="" />
);

export default Page;
