import * as elements from "typed-html";
import omit from "object.omit";
import Box, { BoxProps } from "./box";
import config from "../../tailwind.json";

const screenPrefixes = [""].concat(
  Object.keys(config.theme.screens).map((k) => `${k}:`)
);

type Direction = "column" | "row";
type SpacingKeys = keyof typeof config.theme.spacing;
// type ScreenKeys = keyof typeof config.theme.screens;

type StackProps = BoxProps & {
  direction: Direction | Direction[];
  // TODO: Support the new responsive syntax
  // direction?: Direction | { [k in ScreenKeys | "default"]?: Direction };
  spacing?: SpacingKeys;
  // TODO: Support the new responsive syntax
  // spacing?: SpacingKeys | { [k in ScreenKeys | "default"]?: SpacingKeys };
};

// TODO: Support media query syntax (use convertToClasses)
// https://theme-ui.com/components/flex
const Stack = (
  props: StackProps = {
    direction: "column",
  },
  children: string[]
) => (
  <Box
    {...omit(props, "direction", "spacing")}
    sx={`flex ${parseDirectionClass(props?.direction)} ${parseSpacingClass(
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
  // TODO: Support the new responsive syntax
  if (!spacing) {
    return "";
  }

  const dir = direction === "row" ? "x" : "y";

  return `space-${dir}-${spacing}`;
}

function parseDirectionClass(direction: StackProps["direction"]) {
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

export const displayName = "Stack";
export const Example = () => (
  <Stack direction="column" spacing="2">
    <Box>First</Box>
    <Box>Second</Box>
    <Box>Third</Box>
  </Stack>
);

export default Stack;
