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
  color?: string;
  bg?: string;
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
      ...attachState(props),
      class: constructTailwindClasses(props).join(" "),
    },
    children.join("")
  );

function attachState(props): object {
  if (props?.["x-state"]) {
    return { "x-state": props["x-state"] };
  }

  return {};
}
