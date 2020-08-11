import * as elements from "typed-html";
import omit from "object.omit";
import Box, { BoxProps } from "./box";

// https://theme-ui.com/components/flex
const Flex = (
  props: BoxProps & { direction?: "column" | "row" } = { direction: "column" },
  children: string[]
) => (
  <Box
    {...props}
    sx={`flex ${parseDirectionClass(props?.direction)} ${
      (props?.sx && omit(props.sx, "direction")) || ""
    }`.trim()}
  >
    {children.join("")}
  </Box>
);

function parseDirectionClass(direction) {
  return direction === "column" ? "flex-col" : "flex-row";
}

export const displayName = "Flex";
export const Example = () => (
  <Flex direction="column">
    <Box p="2" bg="primary" sx="flex-auto">
      Flex
    </Box>
    <Box p="2" bg="muted">
      Box
    </Box>
  </Flex>
);

export default Flex;
