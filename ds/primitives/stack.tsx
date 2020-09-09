import * as elements from "typed-html";
import omit from "object.omit";
import Box, { BoxProps } from "./box";
import config from "../../tailwind.json";
import { convertToClasses } from "./_utils";

type Direction = "column" | "row";
type SpacingKeys = keyof typeof config.theme.spacing;
type ScreenKeys = keyof typeof config.theme.screens;

type StackProps = BoxProps & {
  direction?: Direction | { [k in ScreenKeys | "default"]?: Direction };
  spacing?: SpacingKeys | { [k in ScreenKeys | "default"]?: SpacingKeys };
};

const Stack = (
  props: StackProps = {
    direction: "column",
  },
  children: string[]
) => (
  <Box
    {...omit(props, "direction", "spacing")}
    sx={`flex ${convertToClasses(
      "flex",
      (mediaQuery, prefix, v) =>
        `${mediaQuery ? mediaQuery + ":" : ""}${prefix}-${
          v === "column" ? "col" : "row"
        }`
    )(props?.direction)} ${parseSpacingClass(
      props?.direction,
      props?.spacing
    )} ${(props?.sx && props.sx) || ""}`.trim()}
  >
    {children.join("")}
  </Box>
);

function parseSpacingClass(
  direction: StackProps["direction"],
  spacing: StackProps["spacing"]
) {
  if (!spacing) {
    return "";
  }

  return convertToClasses("space", (mediaQuery, prefix, direction) => {
    const klass = `${mediaQuery ? mediaQuery + ":" : ""}${prefix}-${
      direction === "row" ? "x" : "y"
    }-${spacing}`;
    const inverseClass = `${mediaQuery ? mediaQuery + ":" : ""}${prefix}-${
      direction === "row" ? "y" : "x"
    }-0`;

    return `${klass} ${inverseClass}`;
  })(direction);
}

export const displayName = "Stack";
export const Example = () => (
  <Stack direction="column" spacing="2">
    <Stack direction="column" spacing="2" color="white" bg="secondary">
      <Box p="2">First</Box>
      <Box p="2">Second</Box>
      <Box p="2">Third</Box>
    </Stack>
    <Stack
      direction={{ default: "column", lg: "row" }}
      spacing="2"
      color="white"
      bg="secondary"
    >
      <Box p="2">First</Box>
      <Box p="2">Second</Box>
      <Box p="2">Third</Box>
    </Stack>
  </Stack>
);

export default Stack;
