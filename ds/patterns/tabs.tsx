import * as elements from "typed-html";
import Box from "../primitives/box";
import Flex from "../primitives/flex";

// https://tailwindcss.com/components/navigation/#tabs
const Tabs = ({ selectedTab }: { selectedTab: string }, children: string[]) => (
  <Flex direction="column" x-state={`'${selectedTab}'`}>
    {children.join("")}
  </Flex>
);
const TabHeader = ({}, children: string[]) => (
  <Flex direction="row" sx="justify-between">
    {children.join("")}
  </Flex>
);
const TabHeaderItem = ({ tabId }: { tabId: string }, children: string[]) => (
  <Box
    py="2"
    sx="cursor-pointer w-full text-center"
    x-class={`state === '${tabId}' ? 'border-l border-t border-r rounded-t' : 'border-b'`}
    onclick={`setState('${tabId}')`}
  >
    {children.join("")}
  </Box>
);
const TabBody = ({}, children: string[]) => (
  <Box p="2" sx="border-l border-b border-r rounded-b">
    {children.join("")}
  </Box>
);
const TabBodyItem = (
  { tabId }: { tabId: string; showAsFallback?: boolean },
  children: string[]
) => (
  <Box x-class={`state === '${tabId}' ? '' : 'hidden'`}>
    {children.join("")}
  </Box>
);

export const description =
  "Use Tabs when you have a limited amount of space and a related group of items to explain.";
export const displayName = "Tabs";
export const Example = () => (
  <Tabs selectedTab="animals">
    <TabHeader>
      <TabHeaderItem tabId="animals">Animals</TabHeaderItem>
      <TabHeaderItem tabId="languages">Languages</TabHeaderItem>
      <TabHeaderItem tabId="colors">Colors</TabHeaderItem>
    </TabHeader>
    <TabBody>
      <TabBodyItem tabId="animals">Cats, dogs, monkeys</TabBodyItem>
      <TabBodyItem tabId="languages">German, Finnish, English</TabBodyItem>
      <TabBodyItem tabId="colors">blue, green, red</TabBodyItem>
    </TabBody>
  </Tabs>
);
export const showCodeEditor = true;

export { Tabs, TabHeader, TabHeaderItem, TabBody, TabBodyItem };
