import * as elements from "typed-html";
import { constructTailwindClasses } from "./_utils";
import config from "../../tailwind.json";

const theme = config.theme;

type ColorKeys = keyof typeof theme.colors;
type SpacingKeys = keyof typeof theme.spacing;

export type BoxProps = {
  as?: keyof JSX.IntrinsicElements;
  m?: SpacingKeys;
  mb?: SpacingKeys;
  mt?: SpacingKeys;
  ml?: SpacingKeys;
  mr?: SpacingKeys;
  mx?: SpacingKeys;
  my?: SpacingKeys;
  p?: SpacingKeys;
  pb?: SpacingKeys;
  pt?: SpacingKeys;
  pl?: SpacingKeys;
  pr?: SpacingKeys;
  px?: SpacingKeys;
  py?: SpacingKeys;
  // TODO: Figure out the exact type. ColorKeys isn't enough for these
  // The problem here is nesting. For colors that have objects in them,
  // combinations have to be allowed.
  color?: string;
  bg?: string;
  // Exposed attributes
  onclick?: string;
  role?: string;
  // TODO: sx can be only tailwind classes so constraint to those
  sx?: string;
  x?: any;
  style?: string;
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
const extraProps = ["onclick", "role", "x-class", "x-state", "x", "style"];

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
