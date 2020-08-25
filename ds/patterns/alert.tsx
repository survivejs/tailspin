import * as elements from "typed-html";
import Box from "../primitives/box";

// TODO: Variants: info, warning, error
// https://tailwindcss.com/components/alerts
const Alert = ({}, children: string[]) => (
  <Box
    px="4"
    py="3"
    color="red-700"
    bg="red-100"
    sx="border border-red-400 rounded relative"
    role="alert"
  >
    <Box as="span" sx="sm:inline">
      {children.join("")}
    </Box>
  </Box>
);

export const displayName = "Alert";
export const Example = () => <Alert>This is a demo alert</Alert>;
export const showCodeEditor = true;

export default Alert;
