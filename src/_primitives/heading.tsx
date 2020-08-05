import * as elements from "typed-html";
import Box from "./box";

type Heading = "h1" | "h2" | "h3" | "h4";

// https://theme-ui.com/components/heading
// This one is more strict than the reference one and it enforced "as".
export default ({ as }: { as: Heading }, label) => <Box as={as}>{label}</Box>;
