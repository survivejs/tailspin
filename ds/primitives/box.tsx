import * as elements from "../../src/elements.ts";
import { constructTailwindClasses, tailwindKeys } from "./_utils.ts";
import config from "../../tailwind.ts";

type ColorKeys = keyof typeof config.colors;
type MarginKeys = keyof typeof config.unit;
type PaddingKeys = keyof typeof config.unit;
type WidthKeys = keyof typeof config.width;
type MinWidthKeys = keyof typeof config.minWidth;
type MaxWidthKeys = keyof typeof config.maxWidth;
type HeightKeys = keyof typeof config.height;
type MinHeightKeys = keyof typeof config.minHeight;
type MaxHeightKeys = keyof typeof config.maxHeight;
type ScreenKeys = keyof typeof config.screen;

export type BoxProps = {
  as?: keyof JSX.IntrinsicElements;
  m?: MarginKeys | { [k in ScreenKeys | "default"]?: MarginKeys };
  mb?: MarginKeys | { [k in ScreenKeys | "default"]?: MarginKeys };
  mt?: MarginKeys | { [k in ScreenKeys | "default"]?: MarginKeys };
  ml?: MarginKeys | { [k in ScreenKeys | "default"]?: MarginKeys };
  mr?: MarginKeys | { [k in ScreenKeys | "default"]?: MarginKeys };
  mx?: MarginKeys | { [k in ScreenKeys | "default"]?: MarginKeys };
  my?: MarginKeys | { [k in ScreenKeys | "default"]?: MarginKeys };
  p?: PaddingKeys | { [k in ScreenKeys | "default"]?: PaddingKeys };
  pb?: PaddingKeys | { [k in ScreenKeys | "default"]?: PaddingKeys };
  pt?: PaddingKeys | { [k in ScreenKeys | "default"]?: PaddingKeys };
  pl?: PaddingKeys | { [k in ScreenKeys | "default"]?: PaddingKeys };
  pr?: PaddingKeys | { [k in ScreenKeys | "default"]?: PaddingKeys };
  px?: PaddingKeys | { [k in ScreenKeys | "default"]?: PaddingKeys };
  py?: PaddingKeys | { [k in ScreenKeys | "default"]?: PaddingKeys };
  color?: ColorKeys | { [k in ScreenKeys | "default"]?: ColorKeys };
  bg?: ColorKeys | { [k in ScreenKeys | "default"]?: ColorKeys };
  w?: WidthKeys | { [k in ScreenKeys | "default"]?: WidthKeys };
  minw?: MinWidthKeys | { [k in ScreenKeys | "default"]?: MinWidthKeys };
  maxw?: MaxWidthKeys | { [k in ScreenKeys | "default"]?: MaxWidthKeys };
  h?: HeightKeys | { [k in ScreenKeys | "default"]?: HeightKeys };
  minh?: MinHeightKeys | { [k in ScreenKeys | "default"]?: MinHeightKeys };
  maxh?: MaxHeightKeys | { [k in ScreenKeys | "default"]?: MaxHeightKeys };
  // Exposed attributes
  onclick?: string;
  role?: string;
  x?: string;
  style?: string;
  id?: string;
  // TODO: These are for svg -> push to a Svg component?
  d?: string;
  fill?: string;
  stroke?: string;
  viewBox?: string;
  xmlns?: string;
  // TODO: sx can be only tailwind classes so constraint to those
  sx?: string;
  // Shortcut for pure classes
  class?: string;
};

// https://theme-ui.com/components/box
const Box = (props: BoxProps = {}, children: string[]) =>
  elements.createElement(
    props?.as || "div",
    attachAttributes(props),
    children.join("")
  );

export const displayName = "Box";
export const Example = () => (
  <Box
    m="2"
    p="4"
    w={{ default: "full", lg: "auto" }}
    color="white"
    bg="primary"
  >
    Beep
  </Box>
);

export default Box;

function attachAttributes(props?: {}): elements.Attributes {
  if (!props) {
    return {};
  }

  const ret: { [key: string]: string } = {};

  Object.entries(props).forEach(([k, v]) => {
    if (k === "as" || k === "sx") {
      return;
    }

    if (k.split("-").length > 1 || !tailwindKeys.includes(k)) {
      ret[k] = v as string;
    }
  });

  const klass = constructTailwindClasses(props);

  if (klass) {
    ret["class"] = klass;
  }

  return ret;
}
