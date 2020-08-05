import * as elements from "typed-html";
import { constructTailwindClasses, objectToStyle } from "./_utils";

// https://theme-ui.com/components/box
export default (
  props: { p?: number; color?: string; bg?: string; sx?: object } = {},
  children
) => (
  <div
    class={constructTailwindClasses(props).join(" ")}
    style={objectToStyle(props?.sx)}
  >
    {children}
  </div>
);
