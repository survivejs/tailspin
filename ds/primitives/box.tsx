import * as elements from "typed-html";
import { constructTailwindClasses } from "./_utils";
import config from "../../tailwind.json";

type ColorKeys = keyof typeof config.expandedColors;
type SpacingKeys = keyof typeof config.theme.spacing;

export type BoxProps = {
  as?: keyof JSX.IntrinsicElements;
  m?: SpacingKeys;
  mb?: SpacingKeys;
  mt?: SpacingKeys;
  ml?: SpacingKeys;
  mr?: SpacingKeys;
  mx?: SpacingKeys | "auto";
  my?: SpacingKeys | "auto";
  p?: SpacingKeys;
  pb?: SpacingKeys;
  pt?: SpacingKeys;
  pl?: SpacingKeys;
  pr?: SpacingKeys;
  px?: SpacingKeys;
  py?: SpacingKeys;
  color?: ColorKeys;
  bg?: ColorKeys;
  // Exposed attributes
  onclick?: string;
  role?: string;
  x?: any;
  style?: string;
  id?: string;
  // TODO: sx can be only tailwind classes so constraint to those
  sx?: string;
};

// https://theme-ui.com/components/box
const Box = (props: BoxProps = {}, children) =>
  elements.createElement(
    props?.as || "div",
    attachAttributes(props),
    Array.isArray(children) ? children.join("") : children
  );

export const displayName = "Box";
export const Example = () => (
  <Box m="2" p="4" color="white" bg="primary">
    Beep
  </Box>
);

export default Box;

// TODO: Unify with typing, maybe typeof against this one
const extraProps = [
  "onclick",
  "role",
  "x-class",
  "x-closest",
  "x-each",
  "x-label",
  "x-state",
  "x",
  "style",
  "id",
];

// TODO: Likely this should be data- and x- agnostic
function attachAttributes(props): elements.Attributes {
  const ret: { [key: string]: string } = {};

  extraProps.forEach((extraProp) => {
    if (props?.[extraProp]) {
      ret[extraProp] = props[extraProp];
    }
  });

  const klass = constructTailwindClasses(props).join(" ");

  if (klass) {
    ret["class"] = klass;
  }

  return ret;
}
