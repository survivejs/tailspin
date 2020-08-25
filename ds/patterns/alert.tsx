import * as elements from "typed-html";
import Box from "../primitives/box";
import Flex from "../primitives/flex";
import config from "../../tailwind.json";

type ColorKeys = keyof typeof config.expandedColors;
type Variant = "info" | "warning" | "error" | "success";

// TODO: Generate examples using available variants
// https://tailwindcss.com/components/alerts
const Alert = ({ variant }: { variant: Variant }, children: string[]) => {
  const { color, bg, icon } = getStyle(variant);

  return (
    <Flex
      direction="row"
      px="4"
      py="3"
      color={color}
      bg={bg}
      sx={`border border-${color}-400 rounded relative`}
      role="alert"
    >
      <Box mr="2" w="6" h="6">
        {icon}
      </Box>
      <Box>{children.join("")}</Box>
    </Flex>
  );
};

// Icons from https://heroicons.com/
function getStyle(
  variant: Variant
): { color: ColorKeys; bg: ColorKeys; icon: string } {
  switch (variant) {
    case "info":
      return {
        color: "blue-700",
        bg: "blue-100",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      };
    case "success":
      return {
        color: "green-700",
        bg: "green-100",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      };
    case "warning":
      return {
        color: "yellow-700",
        bg: "yellow-100",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        ),
      };
    case "error":
      return {
        color: "red-700",
        bg: "red-100",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      };
  }
}

export const displayName = "Alert";
export const Example = () => (
  <Box sx="space-y-4">
    <Alert variant="info">This is an info alert</Alert>;
    <Alert variant="success">This is a success alert</Alert>;
    <Alert variant="warning">This is a warning alert</Alert>;
    <Alert variant="error">This is an error alert</Alert>;
  </Box>
);

export default Alert;
