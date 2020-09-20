import { elements } from "../../deps.ts";
import Box from "../primitives/Box.tsx";

type Variant = "none" | "disc" | "decimal";

// https://tailwindcss.com/components/alerts
const List = ({ variant }: { variant: Variant }, children: string[]) => (
  <Box as={variant == "decimal" ? "ol" : "ul"} sx={`list-${variant}`}>
    {children.join("")}
  </Box>
);

const ListItem = ({}, children: string[]) => (
  <Box as="li">{children.join("")}</Box>
);

export const displayName = "List";
export const Example = () => (
  <List variant="none">
    <ListItem>Red</ListItem>
    <ListItem>Yellow</ListItem>
    <ListItem>Green</ListItem>
  </List>
);
export const showCodeEditor = true;

export { List, ListItem };
