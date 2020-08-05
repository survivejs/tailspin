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
  // TODO: sx can be only tailwind classes
  sx?: string;
  // TODO: Is this the right way to do this?
  "x-state"?: string;
};

// https://theme-ui.com/components/box
export default (props: BoxProps = {}, children) =>
  elements.createElement(
    props?.as || "div",
    {
      ...attachExtra(props),
      class: constructTailwindClasses(props).join(" "),
    },
    children.join("")
  );

// TODO: Clean up. Likely there needs to be an enum for these
// and the code should check against that.
function attachExtra(props): object {
  const ret: { [key: string]: string } = {};

  if (props?.["onclick"]) {
    ret.onclick = props.onclick;
  }

  if (props?.["role"]) {
    ret.role = props.role;
  }

  if (props?.["x-state"]) {
    ret["x-state"] = props["x-state"];
  }

  return ret;
}
