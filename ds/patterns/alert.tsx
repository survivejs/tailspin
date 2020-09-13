import * as elements from "../../src/elements.ts";
import Box from "../primitives/box.tsx";
import Flex from "../primitives/flex.tsx";
import Stack from "../primitives/stack.tsx";
import config from "../../tailwind.ts";

type ColorKeys = keyof typeof config.colors;
type Variant = "info" | "warning" | "error" | "success";

// TODO: Generate examples using available variants
// https://tailwindcss.com/components/alerts
const Alert = ({ variant }: { variant: Variant }, children: string[]) => {
  const { border, color, bg, icon } = getStyle(variant);

  return (
    <Flex
      direction="row"
      px="4"
      py="3"
      color={color}
      bg={bg}
      sx={`border-solid border-2 border-${border} rounded relative`}
      role="alert"
    >
      <Flex direction="column" mr="2" sx="justify-center">
        {icon}
      </Flex>
      <Box>{children.join("")}</Box>
    </Flex>
  );
};

// Icons from https://heroicons.com/
function getStyle(
  variant: Variant,
): { border: ColorKeys; color: ColorKeys; bg: ColorKeys; icon: string } {
  switch (variant) {
    case "info":
      return {
        border: "blue-400",
        color: "blue-700",
        bg: "blue-100",
        icon: (
          <Box
            as="svg"
            sx="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <Box
              as="path"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </Box>
        ),
      };
    case "success":
      return {
        border: "green-400",
        color: "green-700",
        bg: "green-100",
        icon: (
          <Box
            as="svg"
            sx="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <Box
              as="path"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </Box>
        ),
      };
    case "warning":
      return {
        border: "yellow-400",
        color: "yellow-700",
        bg: "yellow-100",
        icon: (
          <Box
            as="svg"
            sx="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <Box
              as="path"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </Box>
        ),
      };
    case "error":
      return {
        border: "red-400",
        color: "red-700",
        bg: "red-100",
        icon: (
          <Box
            as="svg"
            sx="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <Box
              as="path"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </Box>
        ),
      };
  }
}

export const displayName = "Alert";
export const Example = () => (
  <Stack direction="column" spacing="4">
    <Alert variant="info">This is an info alert</Alert>;
    <Alert variant="success">This is a success alert</Alert>;
    <Alert variant="warning">This is a warning alert</Alert>;
    <Alert variant="error">This is an error alert</Alert>;
  </Stack>
);

export default Alert;
