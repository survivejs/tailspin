import * as elements from "typed-html";
import Box from "./box";

type Heading = "h1" | "h2" | "h3" | "h4";

// https://theme-ui.com/components/heading
// This one is more strict than the reference one and it enforced "as".
const Heading = ({ as }: { as: Heading }, label) => <Box as={as}>{label}</Box>;

export const displayName = "Heading";
export const Example = () => (
  <Box>
    <Heading as="h1">h1 heading</Heading>
    <Heading as="h2">h2 heading</Heading>
    <Heading as="h3">h3 heading</Heading>
    <Heading as="h4">h4 heading</Heading>
  </Box>
);

export default Heading;
