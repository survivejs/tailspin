import * as elements from "typed-html";
import Flex from "./flex";
import Box from "./box";

// TODO: Likely the a would have to become a Link and it could check the target
// as well
const NavigationItem = ({ sx = "", href }, label) => (
  <a
    href={href}
    class={`${sx} block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4`}
  >
    {label}
  </a>
);

// https://tailwindcss.com/components/navigation
const Navigation = ({}, children) => (
  <Flex
    as="nav"
    p={6}
    bg="teal-500"
    sx="items-center justify-between flex-wrap"
  >
    <Flex mr={6} color="white" sx="items-center flex-shrink-0">
      <Box as="span" sx="font-semibold text-xl tracking-tight">
        tailwind-webpack-starter
      </Box>
    </Flex>
    <Box sx="block lg:hidden">
      <Flex
        as="button"
        px={3}
        py={2}
        sx="items-center border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
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
    <Box sx="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      {children.join("")}
    </Box>
  </Flex>
);

export { Navigation, NavigationItem };
