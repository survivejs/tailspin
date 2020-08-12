import * as elements from "typed-html";
import Box from "./box";
import Flex from "./flex";

type ButtonProps = { onclick?: string; sx?: string };

// https://tailwindcss.com/components/buttons
const Button = (props: ButtonProps, label: string[]) => (
  <Box
    as="button"
    onclick={props.onclick}
    py="2"
    px="4"
    sx={`font-bold rounded ${props.sx || ""}`}
  >
    {label}
  </Box>
);

const ButtonPrimary = (props: ButtonProps, label: string[]) => (
  <Button {...props} sx="bg-primary text-white hover:bg-secondary">
    {label}
  </Button>
);
Button.Primary = ButtonPrimary;

const ButtonSecondary = (props: ButtonProps, label: string[]) => (
  <Button {...props} sx="bg-secondary text-white hover:bg-primary">
    {label}
  </Button>
);
Button.Secondary = ButtonSecondary;

export const displayName = "Button";
export const Example = () => (
  <Flex x-state="'foobar'" direction="column" sx="space-y-4">
    <Box as="span" x="'Value: ' + state" />
    <Button
      onclick="setState('foobar')"
      sx="border-solid border-2 border-gray-600"
    >
      Set to foobar
    </Button>
    <Button.Primary onclick="setState('primary')">
      Set to primary
    </Button.Primary>
    <Button.Secondary onclick="setState('secondary')">
      Set to secondary
    </Button.Secondary>
  </Flex>
);

export default Button;
