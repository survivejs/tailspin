import { elements } from "../../deps.ts";
import { Navigation, NavigationItem } from "../patterns/Navigation.tsx";
import Box from "../primitives/Box.tsx";
import Flex from "../primitives/Flex.tsx";
import Link from "../primitives/Link.tsx";
import Text from "../primitives/Text.tsx";

type PageLayoutProps = { body: string; url: string };

// TODO: Support fragments (<>)
const PageLayout = ({ body, url }: PageLayoutProps) => (
  <Box>
    <Box as="header" bg="primary" color="white">
      <Navigation
        logo={<NavigationItem href="/" isSelected={url === "/"}>
          tailspin
        </NavigationItem>}
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
          <NavigationItem
            href="https://github.com/survivejs/tailspin"
          >
            <Box
              px="4"
              py="2"
              color="white"
              sx="inline-block leading-none border-solid rounded border-white border-2 hover:border-transparent hover:text-teal-500 hover:bg-white"
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
  </Box>
);

export const displayName = "PageLayout";
export const Example = () => <PageLayout body="Hello from body" url="/" />;

export default PageLayout;
