import * as elements from "../../src/elements.ts";
import Box from "../primitives/box.tsx";
import Stack from "../primitives/stack.tsx";
import Link from "../primitives/link.tsx";
import Text from "../primitives/text.tsx";

// https://tailwindcss.com/components/alerts
const Tag = ({}, children: string[]) => (
  <Box px="1" color="white" bg="primary" sx="rounded-full">
    <Text size="sm">{children.join("")}</Text>
  </Box>
);

export const displayName = "Tag";
export const Example = () => (
  <Stack direction="row" spacing="2">
    <Tag>Angular.js</Tag>
    <Tag>
      <Link.withExternal href="https://reactjs.org/">React</Link.withExternal>
    </Tag>
    <Tag>Vue</Tag>
  </Stack>
);
export const showCodeEditor = true;

export default Tag;
