import * as elements from "typed-html";
import Flex from "../_primitives/flex";
import Box from "../_primitives/box";
import Link from "../_primitives/link";

const NavigationItem = ({ href }, label) => (
  <Link
    href={href}
    sx="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
  >
    {label}
  </Link>
);

// https://tailwindcss.com/components/navigation
const Navigation = ({}, children) => (
  <Flex
    as="nav"
    p="6"
    bg="teal-500"
    sx="items-center justify-between flex-wrap"
    x-state="false"
  >
    <Flex mr="6" color="white" sx="items-center flex-shrink-0">
      <Box as="span" sx="font-semibold text-xl tracking-tight">
        tailwind-webpack-starter
      </Box>
    </Flex>
    <Box sx="block lg:hidden">
      <Flex
        as="button"
        px="3"
        py="2"
        sx="items-center border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        onclick="setState(v => !v)"
      >
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Flex>
    </Box>
    <Box x-class="['w-full', 'block', 'flex-grow', 'lg:flex', 'lg:items-center', 'lg:w-auto', !state && 'hidden']">
      {children.join("")}
    </Box>
  </Flex>
);

const displayName = "Navigation";

const Example = () => (
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
);

export { Navigation, NavigationItem, displayName, Example };
