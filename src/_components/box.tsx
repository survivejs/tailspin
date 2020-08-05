import * as elements from "typed-html";
import { constructTailwindClasses } from "./_utils";

export type BoxProps = {
  as?: string;
  m?: number;
  mb?: number;
  mt?: number;
  ml?: number;
  mr?: number;
  p?: number;
  pb?: number;
  pt?: number;
  pl?: number;
  pr?: number;
  color?: string;
  bg?: string;
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
