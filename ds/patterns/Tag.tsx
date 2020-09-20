import { elements } from "../../deps.ts";
import Box from "../primitives/Box.tsx";
import Stack from "../primitives/Stack.tsx";
import Link from "../primitives/Link.tsx";
import Text from "../primitives/Text.tsx";

// https://tailwindcss.com/components/alerts
const Tag = ({}, children: string[]) => (
  <Box px="1" color="white" bg="primary" sx="rounded-full">
    <Text size="sm">{children.join("")}</Text>
  </Box>
);

export const description = "Use tag for metadata";
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
