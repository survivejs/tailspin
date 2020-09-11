import * as elements from "../../src/elements.ts";
import Box, { BoxProps } from "./box.tsx";
import config from "../../tailwind.ts";
import { convertToClasses, omit } from "./_utils.ts";

type FontSize = keyof typeof config.fontSize;
type FontWeight = keyof typeof config.fontWeight;
type ScreenKeys = keyof typeof config.screen;

export type TextProps = {
  as?: BoxProps["as"];
  size?: FontSize | { [k in ScreenKeys | "default"]?: FontSize };
  weight?: FontWeight;
};

// TODO: Support responsive syntax
// https://theme-ui.com/components/text
const Text = (props: TextProps, children: string[]) => (
  <Box
    {...omit(props, "size", "weight")}
    sx={`${convertToClasses("text")(props?.size)} ${convertToClasses("font")(
      props?.weight
    )}`.trim()}
  >
    {children.join("")}
  </Box>
);

export const description = "Text is a simple typographic primitive.";
export const displayName = "Text";
export const Example = () => (
  <Box>
    <Text size="4xl">First</Text>
    <Text weight="bold">Second</Text>
    <Text>Third</Text>
  </Box>
);

export default Text;
