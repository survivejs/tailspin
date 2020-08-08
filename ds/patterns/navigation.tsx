import * as elements from "typed-html";
import Flex from "../primitives/flex";
import Box from "../primitives/box";
import Link from "../primitives/link";

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

const NavigationItem = ({ href }, label) => (
  <Link
    href={href}
    sx="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
  >
    {label}
  </Link>
);

Navigation.Item = NavigationItem;

const displayName = "Navigation";
const Example = () => (
  <Navigation>
    <Box sx="text-sm lg:flex-grow">
      <Navigation.Item href="/">Documentation</Navigation.Item>
      <Navigation.Item href="/components">Components</Navigation.Item>
    </Box>
    <Box>
      <Navigation.Item href="https://github.com/survivejs/tailwind-webpack-starter">
        Star at GitHub
      </Navigation.Item>
    </Box>
  </Navigation>
);

export { Navigation as default, displayName, Example };
