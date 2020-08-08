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

// TODO: Clean up. Likely there needs to be an enum for these
// and the code should check against that.
function attachAttributes(props): elements.Attributes {
  const ret: { [key: string]: string } = {};

  if (props?.["onclick"]) {
    ret.onclick = props.onclick;
  }

  if (props?.["role"]) {
    ret.role = props.role;
  }

  if (props?.["x-class"]) {
    ret["x-class"] = props["x-class"];
  }

  if (props?.["x-state"]) {
    ret["x-state"] = props["x-state"];
  }

  const klass = constructTailwindClasses(props).join(" ");

  if (klass) {
    ret["class"] = klass;
  }

  return ret;
}
