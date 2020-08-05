import * as elements from "typed-html";
import { constructTailwindClasses, objectToStyle } from "./_utils";

export type BoxProps = {
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
export default (props: BoxProps = {}, children) => (
  <div
    class={constructTailwindClasses(props).join(" ")}
    {...attachState(props)}
  >
    {children}
  </div>
);

function attachState(props) {
  if (props?.["x-state"]) {
    return { "x-state": props["x-state"] };
  }

  return {};
}
