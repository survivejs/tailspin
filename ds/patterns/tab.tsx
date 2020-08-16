import * as elements from "typed-html";
import Box from "../primitives/box";
import Flex from "../primitives/flex";

// https://tailwindcss.com/components/navigation/#tabs
const TabContainer = (
  { selectedTab }: { selectedTab: string },
  children: string[]
) => (
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
  { tabId, showAsFallback }: { tabId: string; showAsFallback?: boolean },
  children: string[]
) => (
  <Box
    sx={!showAsFallback ? "hidden" : ""}
    x-class={`state === '${tabId}' ? '' : 'hidden'`}
  >
    {children.join("")}
  </Box>
);

const Tab = {
  Container: TabContainer,
  Header: TabHeader,
  HeaderItem: TabHeaderItem,
  Body: TabBody,
  BodyItem: TabBodyItem,
};

export const description =
  "Use Tabs when you have a limited amount of space and a related group of items to explain.";
export const displayName = "Tab";
export const Example = () => (
  <Tab.Container selectedTab="animals">
    <Tab.Header>
      <Tab.HeaderItem tabId="animals">Animals</Tab.HeaderItem>
      <Tab.HeaderItem tabId="languages">Languages</Tab.HeaderItem>
      <Tab.HeaderItem tabId="colors">Colors</Tab.HeaderItem>
    </Tab.Header>
    <Tab.Body>
      <Tab.BodyItem tabId="animals">Cats, dogs, monkeys</Tab.BodyItem>
      <Tab.BodyItem tabId="languages">German, Finnish, English</Tab.BodyItem>
      <Tab.BodyItem tabId="colors">blue, green, red</Tab.BodyItem>
    </Tab.Body>
  </Tab.Container>
);

export default Tab;
