import * as elements from "../../src/elements.ts";
import Box from "../../ds/primitives/box.tsx";
import Flex from "../../ds/primitives/flex.tsx";

// TODO: Replace with a standalone implementation
// import { readableColor } from "https://unpkg.com/polished@3.6.6/dist/polished.cjs.js";

// TODO: Figure out how to handle polymorphism in TS
// Likely this one is easier to solve against expandedColors
const Colors = ({
  items,
  parent,
}: {
  items: { [key: string]: string | { [key: string]: string } };
  parent?: string;
}) =>
  Object.entries(items)
    .map(([key, color]) =>
      isObject(color)
        ? (
          <Flex direction="row">
            <Box ml="1" w="16">
              {key}
            </Box>
            {/* @ts-ignore */}
            <Colors parent={key} items={color} />
          </Flex>
        )
        : (
          <Box
            p={/* @ts-ignore: TODO: Fix */ "1"}
            bg={/* @ts-ignore: TODO: Fix */ parent ? `${parent}-${key}` : key}
            color={parent ? `${parent}-${key}` : key}
            style={`color: ${getComplementary(color as string)}`}
          >
            {key}
          </Box>
        )
    )
    .join("");

// TODO: Consume from _utils
const isObject = (a: unknown) => typeof a === "object";

const getComplementary = (color: string) =>
  tryTo(() => readableColor(color), "#000");

const readableColor = (color: string) => color;

function tryTo(fn: () => unknown, defaultValue: string) {
  try {
    return fn();
  } catch (err) {
    return defaultValue;
  }
}

export default Colors;
