import { elements } from "../../deps.ts";
import Box from "../primitives/Box.tsx";
import Flex from "../primitives/Flex.tsx";

const Accordion = ({ title }: { title: string }, children: string[]) => (
  <Box mb="2" x-state="false">
    <Flex
      direction="row"
      sx="justify-between cursor-pointer"
      onclick="setState(visible => !visible)"
    >
      <Box as="span">{title}</Box>
      <Box as="span" x="state ? '+' : '-'" />
    </Flex>
    <div class="py-2 text-gray-600" x-class="!state && 'hidden'">
      {children.join("")}
    </div>
  </Box>
);

export const description =
  "Use Accordion when you want to show a lot of information in a compact space.";
export const displayName = "Accordion";
export const Example = () => (
  <Accordion title="Junior engineer">
    Junior engineer description goes here
  </Accordion>
);
export const showCodeEditor = true;

export default Accordion;
