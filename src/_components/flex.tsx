import * as elements from "typed-html";
import Box, { BoxProps } from "./box";

// https://theme-ui.com/components/flex
export default (props: BoxProps = {}, children) => (
  <Box {...props} classes={["flex"]}>
    {children.join("")}
  </Box>
);
