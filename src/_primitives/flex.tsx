import * as elements from "typed-html";
import Box, { BoxProps } from "./box";

// https://theme-ui.com/components/flex
const Flex = (props: BoxProps = {}, children) => (
  <Box {...props} sx={`flex ${props?.sx && props.sx}`}>
    {children.join("")}
  </Box>
);

export const displayName = "Flex";
export const Example = () => (
  <Flex>
    <Box p="2" bg="primary" sx="flex-auto">
      Flex
    </Box>
    <Box p="2" bg="muted">
      Box
    </Box>
  </Flex>
);

export default Flex;
