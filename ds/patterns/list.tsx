import * as elements from "typed-html";
import Box from "../primitives/box";

type ListType = "none" | "disc" | "decimal";

// https://tailwindcss.com/components/alerts
const List = ({ type }: { type: ListType }, children: string[]) => (
  <Box as={type == "decimal" ? "ol" : "ul"} sx={`list-${type}`}>
    {children.join("")}
  </Box>
);

const Item = ({}, children: string[]) => <Box as="li">{children.join("")}</Box>;
List.Item = Item;

export const displayName = "List";
export const Example = () => (
  <List type="none">
    <List.Item>Red</List.Item>
    <List.Item>Yellow</List.Item>
    <List.Item>Green</List.Item>
  </List>
);

export default List;
