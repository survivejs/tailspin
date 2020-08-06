import * as elements from "typed-html";
import Box from "./box";

// https://tailwindcss.com/components/buttons
export default (props: { onclick?: string; sx?: string }, label) => (
  <Box as="button" onclick={props.onclick} sx={`btn ${props.sx || ""}`}>
    {label}
  </Box>
);
