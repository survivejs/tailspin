import * as elements from "typed-html";
import omit from "object.omit";
import Box, { BoxProps } from "./box";
import config from "../../tailwind.json";
import { convertToClasses } from "./_utils";

type FontSize = keyof typeof config.theme.fontSize;
type FontWeight = keyof typeof config.theme.fontWeight;
type ScreenKeys = keyof typeof config.theme.screens;

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
