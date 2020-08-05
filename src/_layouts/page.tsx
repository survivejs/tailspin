import * as elements from "typed-html";
import { Navigation, NavigationItem } from "../_components/navigation";
import Box from "../_components/box";

export default ({ head, body, cssTags, jsTags, htmlAttributes }) => (
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
            <NavigationItem href="/">Documentation</NavigationItem>
            <NavigationItem href="/components">Components</NavigationItem>
          </Box>
          <Box>
            <NavigationItem href="https://github.com/survivejs/tailwind-webpack-starter">
              <Box sx="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white">
                Download
              </Box>
            </NavigationItem>
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
