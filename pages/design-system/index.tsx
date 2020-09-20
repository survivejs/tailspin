import { getComponents, elements } from "../../deps.ts";
import PageLayout from "../../ds/layouts/Page.tsx";
import Toc from "../../ds/patterns/Toc.tsx";
import Flex from "../../ds/primitives/Flex.tsx";
import Box from "../../ds/primitives/Box.tsx";
import Stack from "../../ds/primitives/Stack.tsx";
import Heading from "../../ds/primitives/Heading.tsx";
import config from "../../tailwind.ts";
import Colors from "./Colors.tsx";
import SpacingScale from "./SpacingScale.tsx";
import Collection from "./Collection.tsx";

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
            <SpacingScale items={Object.keys(config.spacing)} />
          </Box>
          <Box>
            <Heading level={2} size="2xl" withAnchor>
              Colors
            </Heading>
            <Colors items={config.extendedColors} />
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
    "You can find the different variants and components of the system on this page",
};

export default DesignSystemPage;
