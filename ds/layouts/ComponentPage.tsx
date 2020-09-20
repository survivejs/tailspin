import { elements } from "../../deps.ts";
import type { DesignSystemComponent } from "../../types.ts";
import PageLayout from "./Page.tsx";
import Tag, {
  Example as TagExample,
  description as tagDescription,
} from "../patterns/Tag.tsx";
import Stack from "../primitives/Stack.tsx";
import Box from "../primitives/Box.tsx";
import Heading from "../primitives/Heading.tsx";

const ComponentPageLayout = ({
  url,
  attributes: {
    component,
  },
}: {
  url: string;
  attributes: {
    component: DesignSystemComponent;
  };
}) => (
  <PageLayout
    url={url}
    body={<Box as="article" m="8" mx="auto" w="full" class="prose lg:prose-xl">
      <Heading level={1} size="4xl">
        {component.displayName}
      </Heading>
      <Stack direction="column" spacing="4">
        <Box>{component.description}</Box>
        <Box>{component.Example()}</Box>
      </Stack>
    </Box>}
  />
);

export const displayName = "BlogPageLayout";
export const Example = () => (
  <ComponentPageLayout
    url="/"
    attributes={{
      component: {
        displayName: "Tag",
        description: tagDescription,
        default: Tag,
        Example: TagExample,
      },
    }}
  />
);

export default ComponentPageLayout;
