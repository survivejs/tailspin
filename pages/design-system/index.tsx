import * as _path from "https://deno.land/std/path/mod.ts";
import * as elements from "../../src/elements.ts";
import PageLayout from "../../ds/layouts/page.tsx";

import Toc from "../../ds/patterns/toc.tsx";
import Flex from "../../ds/primitives/flex.tsx";
import Box from "../../ds/primitives/box.tsx";
import Stack from "../../ds/primitives/stack.tsx";
import Heading from "../../ds/primitives/heading.tsx";
import config from "../../tailwind.ts";
import getComponents from "./get-components.ts";
import Colors from "./colors.tsx";
import SpacingScale from "./spacing-scale.tsx";
import Collection from "./collection.tsx";

const colors = config.colors;
const spacingScale = Object.keys(config.spacing);

const DesignSystemPage = async (props: { url: string }) => (
  <PageLayout
    {...props}
    body={<Flex direction="row" m={{ lg: "8" }}>
      <Box as="aside" w={{ lg: "1/3" }} sx="hidden lg:inline">
        <Toc />
      </Box>
      <Stack
        as="article"
        direction="column"
        spacing="16"
        w={{ default: "full", lg: "2/3" }}
        maxw={{ lg: "2xl" }}
      >
        <Heading level={1} size="4xl" withAnchor>
          Design System
        </Heading>

        <Flex as="section" direction={{ default: "column", md: "row" }}>
          <Box sx="flex-auto">
            <Heading level={2} size="2xl" withAnchor>
              Spacing scale
            </Heading>
            <SpacingScale items={spacingScale} />
          </Box>
          <Box>
            <Heading level={2} size="2xl" withAnchor>
              Colors
            </Heading>
            <Colors items={colors} />
          </Box>
        </Flex>

        <Box as="section">
          <Heading level={2} size="2xl" withAnchor>
            Primitives
          </Heading>
          <Stack direction="column" spacing="4">
            <Collection items={await getComponents("primitives")} />
          </Stack>
        </Box>

        <Box as="section">
          <Heading level={2} size="2xl" withAnchor>
            Patterns
          </Heading>
          <Stack direction="column" spacing="4">
            <Collection items={await getComponents("patterns")} />
          </Stack>
        </Box>

        <Box as="section">
          <Heading level={2} size="2xl" withAnchor>
            Layouts
          </Heading>
          <Stack direction="column" spacing="4">
            <Collection items={await getComponents("layouts")} />
          </Stack>
        </Box>
      </Stack>
    </Flex>}
  />
);

DesignSystemPage.title = "Design system";
DesignSystemPage.meta = {
  description:
    "tailwind-webpack-starter combines webpack with Tailwind and provides a starting point for site projects",
};

export default DesignSystemPage;
