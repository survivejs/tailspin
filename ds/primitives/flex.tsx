import * as elements from "typed-html";
import omit from "object.omit";
import Box, { BoxProps } from "./box";
import config from "../../tailwind.json";
import { convertToClasses } from "./_utils";

type Direction = "column" | "row";
type ScreenKeys = keyof typeof config.theme.screens;

type FlexProps = BoxProps & {
  direction?: Direction | { [k in ScreenKeys | "default"]?: Direction };
};

// https://theme-ui.com/components/flex
const Flex = (
  props: FlexProps = {
    direction: "column",
  },
  children: string[]
) => (
  <Box
    {...omit(props, "direction")}
    sx={`flex ${convertToClasses(
      "flex",
      (mediaQuery, prefix, v) =>
        `${mediaQuery ? mediaQuery + ":" : ""}${prefix}-${
          v === "column" ? "col" : "row"
        }`
    )(props?.direction)} ${(props?.sx && props.sx) || ""}`.trim()}
  >
    {children.join("")}
  </Box>
);

export const displayName = "Flex";
export const Example = () => (
  <Flex direction="column">
    <Flex direction="column">
      <Box p="2" bg="primary" sx="flex-auto">
        Flex
      </Box>
      <Box p="2" color="white" bg="muted">
        Box
      </Box>
    </Flex>
    <Flex direction={{ default: "column", md: "row" }}>
      <Box p="2" bg="primary" sx="flex-auto">
        Flex
      </Box>
      <Box p="2" color="white" bg="muted">
        Box
      </Box>
    </Flex>
  </Flex>
);

export default Flex;
