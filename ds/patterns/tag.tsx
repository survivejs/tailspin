import * as elements from "typed-html";
import Box from "../primitives/box";
import Flex from "../primitives/flex";
import Link from "../primitives/link";

// https://tailwindcss.com/components/alerts
const Tag = ({}, children: string[]) => (
  <Box px="1" color="white" bg="primary" sx="rounded-full text-sm">
    {children}
  </Box>
);

export const displayName = "Tag";
export const Example = () => (
  <Flex direction="row" sx="space-x-2">
    <Tag>Angular.js</Tag>
    <Tag>
      <Link.withExternal href="https://reactjs.org/">React</Link.withExternal>
    </Tag>
    <Tag>Vue</Tag>
  </Flex>
);

export default Tag;
