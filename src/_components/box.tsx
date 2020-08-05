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
};

// https://theme-ui.com/components/box
export default (props: BoxProps = {}, children) => (
  <div class={constructTailwindClasses(props).join(" ")}>{children}</div>
);
