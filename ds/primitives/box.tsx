import * as elements from "typed-html";
import { constructTailwindClasses, tailwindKeys } from "./_utils";
import config from "../../tailwind.json";

type ColorKeys = keyof typeof config.expandedColors;
type MarginKeys = keyof typeof config.theme.margin;
type PaddingKeys = keyof typeof config.theme.padding;

export type BoxProps = {
  as?: keyof JSX.IntrinsicElements;
  m?: MarginKeys;
  mb?: MarginKeys;
  mt?: MarginKeys;
  ml?: MarginKeys;
  mr?: MarginKeys;
  mx?: MarginKeys | "auto";
  my?: MarginKeys | "auto";
  p?: PaddingKeys;
  pb?: PaddingKeys;
  pt?: PaddingKeys;
  pl?: PaddingKeys;
  pr?: PaddingKeys;
  px?: PaddingKeys;
  py?: PaddingKeys;
  color?: ColorKeys;
  bg?: ColorKeys;
  // Exposed attributes
  onclick?: string;
  role?: string;
  x?: string;
  style?: string;
  id?: string;
  // TODO: sx can be only tailwind classes so constraint to those
  sx?: string;
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
  <Box m="2" p="4" color="white" bg="primary">
    Beep
  </Box>
);

export default Box;

function attachAttributes(props): elements.Attributes {
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

  const klass = constructTailwindClasses(props).join(" ");

  if (klass) {
    ret["class"] = klass;
  }

  return ret;
}
