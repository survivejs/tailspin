import * as elements from "typed-html";
import Box from "./box";
import Link from "./link";

type Heading = "h1" | "h2" | "h3" | "h4";

// https://theme-ui.com/components/heading
// This one is more strict than the reference one and it enforced "as".
const Heading = ({ as }: { as: Heading }, label) => <Box as={as}>{label}</Box>;

const HeadingWithAnchor = ({ as }: { as: Heading }, label) => {
  // TODO: Keep track of these + generate unique ids
  const id = label;

  return (
    <Box>
      <Box as={as} sx="inline" id={id}>
        {label}
      </Box>
      <Box ml="2" color="primary" sx="inline hover:secondary cursor-pointer">
        <Link.withExternal href={`#${id}`}>#</Link.withExternal>
      </Box>
    </Box>
  );
};

Heading.withAnchor = HeadingWithAnchor;

export const displayName = "Heading";
export const Example = () => (
  <Box>
    <Heading as="h1">h1 heading</Heading>
    <Heading as="h2">h2 heading</Heading>
    <Heading as="h3">h3 heading</Heading>
    <Heading as="h4">h4 heading</Heading>
    <Heading.withAnchor as="h4">h4 heading with anchor</Heading.withAnchor>
  </Box>
);

export default Heading;
