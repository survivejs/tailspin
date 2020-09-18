import { elements } from "../../deps.ts";
import Box from "../../ds/primitives/box.tsx";

const SpacingScale = ({ items }: { items: string[] }) =>
  items
    .map((key) => (
      <Box bg="gray-400" sx={`w-${key}`}>
        {key}
      </Box>
    ))
    .join("");

export default SpacingScale;
