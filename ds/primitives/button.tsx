import * as elements from "typed-html";
import Box from "./box";

// https://tailwindcss.com/components/buttons
const Button = (props: { onclick?: string; sx?: string }, label) => (
  <Box as="button" onclick={props.onclick} sx={`btn ${props.sx || ""}`}>
    {label}
  </Box>
);

export const displayName = "Button";
export const Example = () => (
  <Box x-state="false">
    <Box mb="4">
      <Box as="span" mr="1">
        Value:
      </Box>
      <Box as="span" x="state" />
    </Box>
    <Box>
      <Button onclick="setState(v => !v)" sx="btn-blue">
        Demo button
      </Button>
    </Box>
  </Box>
);

export default Button;
