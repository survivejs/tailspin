import * as elements from "typed-html";
import { constructTailwindClasses, objectToStyle } from "./_utils";

// https://theme-ui.com/components/flex
export default (
  props: { p?: number; color?: string; bg?: string; sx?: object } = {},
  children
) => (
  <div
    class={constructTailwindClasses(props).concat("flex").join(" ")}
    style={objectToStyle(props?.sx)}
  >
    {children}
  </div>
);
