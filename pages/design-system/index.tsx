import * as _path from "https://deno.land/std/path/mod.ts";
import { expandGlobSync } from "https://deno.land/std/fs/mod.ts";

// TODO: Replace with a standalone implementation
// import { readableColor } from "https://unpkg.com/polished@3.6.6/dist/polished.cjs.js";

import * as elements from "../../src/elements.ts";
import PageLayout from "../../ds/layouts/page.tsx";
import { CodeContainer, CodeEditor } from "../../ds/patterns/code-editor.tsx";
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableBodyCell,
  TableRow,
} from "../../ds/patterns/table.tsx";
import {
  Tabs,
  TabHeader,
  TabHeaderItem,
  TabBody,
  TabBodyItem,
} from "../../ds/patterns/tabs.tsx";
import Toc from "../../ds/patterns/toc.tsx";
import Flex from "../../ds/primitives/flex.tsx";
import Box from "../../ds/primitives/box.tsx";
import Stack from "../../ds/primitives/stack.tsx";
import Heading from "../../ds/primitives/heading.tsx";
import config from "../../tailwind.ts";
import evaluateCode from "./evaluate-code.ts";
import parseCode from "./parse-code.ts";
import parseProps from "./parse-props.ts";

const colors = config.colors;
const spacingScale = Object.keys(config.spacing);

const DesignSystemPage = async (props: { url: string }) => (
  <PageLayout
    {...props}
    body={
      <Flex direction="row" m={{ lg: "8" }}>
        <Box as="aside" w={{ lg: "1/3" }} sx="hidden lg:inline">
          <Toc />
        </Box>
        <Stack
          as="article"
          direction="column"
          spacing="16"
          w={{ default: "full", lg: "2/3" }}
          maxw={{ lg: "2xl" }}
        >
          <Heading level={1} size="4xl" withAnchor>
            Design System
          </Heading>

          <Flex as="section" direction={{ default: "column", md: "row" }}>
            <Box sx="flex-auto">
              <Heading level={2} size="2xl" withAnchor>
                Spacing scale
              </Heading>
              <SpacingScale items={spacingScale} />
            </Box>
            <Box>
              <Heading level={2} size="2xl" withAnchor>
                Colors
              </Heading>
              <Colors items={colors} />
            </Box>
          </Flex>

          <Box as="section">
            <Heading level={2} size="2xl" withAnchor>
              Primitives
            </Heading>
            <Stack direction="column" spacing="4">
              <Collection items={await getComponents("primitives")} />
            </Stack>
          </Box>

          <Box as="section">
            <Heading level={2} size="2xl" withAnchor>
              Patterns
            </Heading>
            <Stack direction="column" spacing="4">
              <Collection items={await getComponents("patterns")} />
            </Stack>
          </Box>

          <Box as="section">
            <Heading level={2} size="2xl" withAnchor>
              Layouts
            </Heading>
            <Stack direction="column" spacing="4">
              <Collection items={await getComponents("layouts")} />
            </Stack>
          </Box>
        </Stack>
      </Flex>
    }
  />
);

DesignSystemPage.title = "Design system";
DesignSystemPage.meta = {
  description:
    "tailwind-webpack-starter combines webpack with Tailwind and provides a starting point for site projects",
};

async function getComponents(type: string) {
  const componentDirectory = _path.posix.join(Deno.cwd(), "ds", type);

  const ret = [];

  for (const file of expandGlobSync(
    _path.posix.join(componentDirectory, "*.tsx")
  )) {
    ret.push(await getComponent(componentDirectory, file.path));
  }

  return ret;
}

async function getComponent(componentDirectory: string, componentPath: string) {
  const source = Deno.readTextFileSync(componentPath);
  const component = await import(componentPath);
  const { displayName } = component;

  return {
    ...component,
    path: componentPath,
    source,
    componentSource: component.showCodeEditor
      ? parseCode({ name: displayName, path: componentPath, source })
      : "",
    exampleSource: parseCode({ name: "Example", path: componentPath, source }),
    props: parseProps({
      componentDirectory,
      displayName,
      path: componentPath,
      source,
    }),
  };
}

type Component = {
  displayName: string;
  description: string;
  default: () => string;
  exampleSource: string;
  componentSource: string;
  // TODO: Prop type
  props: any[];
};

const Collection = ({ items }: { items: Component[] }) => {
  const componentSources = getComponentSources(items);

  return items
    .map(
      ({ displayName, description, exampleSource, componentSource, props }) => (
        <Stack direction="column" spacing="4">
          <CodeContainer sources={{ componentSource, exampleSource }}>
            <Heading level={3} size="xl" withAnchor>
              {displayName}
            </Heading>
            <Box as="p">{description ? description : ""}</Box>
            <Tabs selectedTab="exampleSource">
              <TabHeader>
                <TabHeaderItem tabId="exampleSource">
                  Example source
                </TabHeaderItem>
                {componentSource ? (
                  <TabHeaderItem tabId="componentSource">
                    Component source
                  </TabHeaderItem>
                ) : (
                  ""
                )}
                {props?.length > 0 ? (
                  <TabHeaderItem tabId="props">Props</TabHeaderItem>
                ) : (
                  ""
                )}
              </TabHeader>
              <TabBody>
                <TabBodyItem tabId="exampleSource">
                  <CodeEditor
                    parent="codeEditor"
                    value="exampleSource"
                    fallback={exampleSource}
                  />
                </TabBodyItem>
                <TabBodyItem tabId="componentSource">
                  <CodeEditor
                    parent="codeEditor"
                    value="componentSource"
                    fallback={componentSource}
                  />
                </TabBodyItem>
                {props?.length > 0 ? (
                  <TabBodyItem tabId="props">
                    <Types props={props} />
                  </TabBodyItem>
                ) : (
                  ""
                )}
              </TabBody>
            </Tabs>
            {/* TODO: Add a fallback (evaluate code) here to work progressively */}
            <Box
              p="4"
              bg="gray-200"
              sx="rounded-b-lg"
              x={`evaluateCode(codeEditor.exampleSource, '${displayName}', codeEditor.componentSource)`}
            >
              {evaluateCode(componentSources, exampleSource, displayName)}
            </Box>
          </CodeContainer>
        </Stack>
      )
    )
    .join("");
};

function getComponentSources(items: Component[]) {
  const ret: { [key: string]: () => string } = {};

  items.forEach(({ displayName, default: def }) => {
    ret[displayName] = def;
  });

  return ret;
}

const SpacingScale = ({ items }: { items: string[] }) =>
  items
    .map((key) => (
      <Box bg="gray-400" sx={`w-${key}`}>
        {key}
      </Box>
    ))
    .join("");

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
      isObject(color) ? (
        <Flex direction="row">
          <Box ml="1" w="16">
            {key}
          </Box>
          {/* @ts-ignore */}
          <Colors parent={key} items={color} />
        </Flex>
      ) : (
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

const Types = ({
  props = [],
}: {
  props: {
    name: string;
    isOptional: boolean;
    type: "string";
  }[];
}) =>
  props.length > 0 ? (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Type</TableHeaderCell>
          <TableHeaderCell>Is optional</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props
          .map(({ name, isOptional, type }) => (
            <TableRow>
              <TableBodyCell>
                <Box as="code">{name}</Box>
              </TableBodyCell>
              <TableBodyCell>{type}</TableBodyCell>
              <TableBodyCell>{isOptional ? "✓" : ""}</TableBodyCell>
            </TableRow>
          ))
          .join("")}
      </TableBody>
    </Table>
  ) : (
    ""
  );

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

export default DesignSystemPage;
