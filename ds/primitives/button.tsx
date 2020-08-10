import * as elements from "typed-html";
import Box from "./box";
import Flex from "./flex";

// https://tailwindcss.com/components/buttons
const Button = (props: { onclick?: string; sx?: string }, label: string[]) => (
  <Box as="button" onclick={props.onclick} sx={`btn ${props.sx || ""}`}>
    {label}
  </Box>
);

export const displayName = "Button";
export const Example = () => (
  <Flex x-state="false" sx="flex-col space-y-4">
    <Box as="span" x="'Value: ' + state" />
    <Button onclick="setState(v => !v)" sx="btn-blue">
      Demo button
    </Button>
  </Flex>
);

export default Button;
