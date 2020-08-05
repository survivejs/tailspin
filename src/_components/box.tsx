import * as elements from "typed-html";
import { constructTailwindClasses, objectToStyle } from "./_utils";

export type BoxProps = {
  p?: number;
  color?: string;
  bg?: string;
  sx?: object;
  classes?: string[];
};

// https://theme-ui.com/components/box
export default (props: BoxProps = {}, children) => (
  <div
    class={constructTailwindClasses(props).join(" ")}
    style={objectToStyle(props?.sx)}
  >
    {children}
  </div>
);
