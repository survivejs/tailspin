import { elements } from "../../deps.ts";
import Flex from "../primitives/Flex.tsx";
import Box from "../primitives/Box.tsx";
import Link, { ExternalLinkProps } from "../primitives/Link.tsx";
import ow from "../ow.ts";

// https://tailwindcss.com/components/navigation
const Navigation = ({ logo }: { logo?: string }, children: string[]) => (
  <Flex
    as="nav"
    direction="row"
    p="6"
    sx="items-center justify-between flex-wrap"
    x-state="false"
  >
    <Flex mr="6" direction="row" sx="items-center flex-shrink-0">
      {logo}
    </Flex>
    <Box sx="block lg:hidden">
      <Flex
        as="button"
        direction="column"
        px="3"
        py="2"
        sx="items-center border-solid rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        onclick="setState(v => !v)"
      >
        <Box
          as="svg"
          sx="fill-current w-3 h-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Box as="title">Menu</Box>
          <Box as="path" d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </Box>
      </Flex>
    </Box>
    <Box
      x-class={`!state && '${ow`hidden`}'`}
      w="full"
      sx="block flex-grow lg:flex lg:items-center lg:w-auto"
    >
      {children.join("")}
    </Box>
  </Flex>
);

const NavigationItem = (
  { href, isSelected }: ExternalLinkProps & { isSelected?: boolean },
  label: string[],
) => (
  <Link.withExternal
    href={href}
    sx={`${
      isSelected ? "font-bold" : ""
    } block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4`}
  >
    {label}
  </Link.withExternal>
);

const displayName = "Navigation";
const Example = () => (
  <Box bg="primary" color="white">
    <Navigation
      logo={<NavigationItem href="/">tailspin</NavigationItem>}
    >
      <Box sx="lg:flex-grow">
        <NavigationItem href="/blog/">Blog</NavigationItem>
        <NavigationItem href="/design-system/" isSelected={true}>
          Design system
        </NavigationItem>
      </Box>
      <Box>
        <NavigationItem
          href="https://github.com/survivejs/tailspin"
        >
          Star at GitHub
        </NavigationItem>
      </Box>
    </Navigation>
  </Box>
);
export const showCodeEditor = true;

export { Navigation, NavigationItem, displayName, Example };
