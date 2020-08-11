import * as elements from "typed-html";
import omit from "object.omit";
import Box, { BoxProps } from "./box";
import config from "../../tailwind.json";

const screenPrefixes = [""].concat(
  Object.keys(config.theme.screens).map((k) => `${k}:`)
);

type Direction = "column" | "row";

//  sx="flex-col sm:flex-row"
// https://theme-ui.com/components/flex
const Flex = (
  props: BoxProps & { direction?: Direction | Direction[] } = {
    direction: "column",
  },
  children: string[]
) => (
  <Box
    {...omit(props, "direction")}
    sx={`flex ${parseDirectionClass(props?.direction)} ${
      (props?.sx && props.sx) || ""
    }`.trim()}
  >
    {children.join("")}
  </Box>
);

function parseDirectionClass(direction) {
  if (Array.isArray(direction)) {
    return direction
      .map(
        (dir, i) =>
          `${screenPrefixes[i]}flex-${dir === "column" ? "col" : "row"}`
      )
      .join(" ");
  }

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
