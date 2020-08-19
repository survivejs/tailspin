import * as elements from "typed-html";
import Box from "../primitives/box";

type ListType = "none" | "disc" | "decimal";

// https://tailwindcss.com/components/alerts
const List = ({ type }: { type: ListType }, children: string[]) => (
  <Box as={type == "decimal" ? "ol" : "ul"} sx={`list-${type}`}>
    {children.join("")}
  </Box>
);

const ListItem = ({}, children: string[]) => (
  <Box as="li">{children.join("")}</Box>
);

export const displayName = "List";
export const Example = () => (
  <List type="none">
    <ListItem>Red</ListItem>
    <ListItem>Yellow</ListItem>
    <ListItem>Green</ListItem>
  </List>
);

export { List, ListItem };
