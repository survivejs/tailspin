import _fs from "fs";
import _path from "path";
import * as elements from "typed-html";
import readableColor from "polished/lib/color/readableColor";
import glob from "glob";
import PageLayout from "../../ds/layouts/page";
import { CodeContainer, CodeEditor } from "../../ds/patterns/code-editor";
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableBodyCell,
  TableRow,
} from "../../ds/patterns/table";
import {
  Tabs,
  TabHeader,
  TabHeaderItem,
  TabBody,
  TabBodyItem,
} from "../../ds/patterns/tabs";
import Toc from "../../ds/patterns/toc";
import Flex from "../../ds/primitives/flex";
import Box from "../../ds/primitives/box";
import Heading from "../../ds/primitives/heading";
import config from "../../tailwind.json";
import evaluateCode from "./evaluate-code";
import parseCode from "./parse-code";
import parseProps from "./parse-props";
import { name } from "../../package.json";

const theme = config.theme;
const colors = theme.colors;
const spacingScale = Object.keys(theme.spacing);

const DesignSystemPage = (props) => (
  <PageLayout
    {...props}
    head={[
      <title>{name} - Design System</title>,
      <meta
        name="description"
        content="tailwind-webpack-starter combines webpack with Tailwind and provides a starting point for site projects"
      ></meta>,
    ]}
    body={
      <Flex direction="row" sx="lg:m-8">
        <Box as="aside" sx="hidden lg:inline lg:w-1/3">
          <Toc />
        </Box>
        <Box as="article" w="full" sx="lg:w-2/3 lg:max-w-2xl space-y-16">
          <Heading level={1} size="4xl" withAnchor>
            Design System
          </Heading>

          <Flex as="section" direction={["column", "row"]}>
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
            <Box sx="space-y-4">
              <Collection items={getComponents("primitives")} />
            </Box>
          </Box>

          <Box as="section">
            <Heading level={2} size="2xl" withAnchor>
              Patterns
            </Heading>
            <Box sx="space-y-4">
              <Collection items={getComponents("patterns")} />
            </Box>
          </Box>

          <Box as="section">
            <Heading level={2} size="2xl" withAnchor>
              Layouts
            </Heading>
            <Box sx="space-y-4">
              <Collection items={getComponents("layouts")} />
            </Box>
          </Box>
        </Box>
      </Flex>
    }
  />
);

function getComponents(type) {
  const componentDirectory = _path.join(__dirname, "..", "..", "ds", type);

  return glob
    .sync(_path.join(componentDirectory, "*.tsx"))
    .map(getComponent(componentDirectory));
}

function getComponent(componentDirectory: string) {
  return (path: string) => {
    const source = _fs.readFileSync(path, { encoding: "utf-8" });
    const component = require(path);
    const { displayName } = component;

    return {
      ...component,
      path,
      source,
      componentSource: component.showCodeEditor
        ? parseCode({ name: displayName, path, source })
        : "",
      exampleSource: parseCode({ name: "Example", path, source }),
      props: parseProps({
        componentDirectory,
        displayName,
        path,
        source,
      }),
    };
  };
}

const Collection = ({ items }) => {
  const componentSources = getComponentSources(items);

  return items
    .map(
      ({ displayName, description, exampleSource, componentSource, props }) => (
        <Box sx="space-y-4">
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
        </Box>
      )
    )
    .join("");
};

function getComponentSources(items) {
  const ret = {};

  items.forEach(({ displayName, default: def }) => {
    ret[displayName] = def;
  });

  return ret;
}

const SpacingScale = ({ items }) =>
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
        // @ts-ignore
        <Box
          p="1"
          bg={parent ? `${parent}-${key}` : key}
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

const isObject = (a) => typeof a === "object";

const getComplementary = (color: string) =>
  tryTo(() => readableColor(color), "#000");

function tryTo(fn, defaultValue) {
  try {
    return fn();
  } catch (err) {
    return defaultValue;
  }
}

export default DesignSystemPage;
