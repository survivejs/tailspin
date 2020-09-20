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
  attributes,
}: {
  url: string;
  attributes: DesignSystemComponent;
}) => (
  <PageLayout
    url={url}
    body={<Box as="article" m="8" mx="auto" w="full" class="prose lg:prose-xl">
      <Heading level={1} size="4xl">
        {attributes.displayName}
      </Heading>
      <Stack direction="column" spacing="4">
        <Box>{attributes.description}</Box>
        <Box>{attributes.Example()}</Box>
      </Stack>
    </Box>}
  />
);

export const displayName = "BlogPageLayout";
export const Example = () => (
  <ComponentPageLayout
    url="/"
    attributes={{
      displayName: "Tag",
      description: tagDescription,
      default: Tag,
      Example: TagExample,
    }}
  />
);

export default ComponentPageLayout;
