import * as elements from "typed-html";
import Box from "../primitives/box";
import Stack from "../primitives/stack";
import Link from "../primitives/link";

// https://tailwindcss.com/components/alerts
const Tag = ({}, children: string[]) => (
  <Box px="1" color="white" bg="primary" sx="rounded-full text-sm">
    {children.join("")}
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
