import _fs from "fs";
import _path from "path";
import * as elements from "typed-html";
import * as ts from "typescript";
import * as prettier from "prettier";
import { tsquery } from "@phenomnomnominal/tsquery";
import readableColor from "polished/lib/color/readableColor";
import glob from "glob";
import PageLayout from "../../ds/layouts/page";
import CodeEditor from "../../ds/patterns/code-editor";
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableBodyCell,
  TableRow,
} from "../../ds/patterns/table";
import {
  TabContainer,
  TabHeader,
  TabHeaderItem,
  TabBody,
  TabBodyItem,
} from "../../ds/patterns/tab";
import Toc from "../../ds/patterns/toc";
import Flex from "../../ds/primitives/flex";
import Box from "../../ds/primitives/box";
import Heading from "../../ds/primitives/heading";
import config from "../../tailwind.json";
import evaluateCode from "./evaluate-code";

const theme = config.theme;
const colors = theme.colors;
const spacingScale = Object.keys(theme.spacing);

const DesignSystemPage = (props) => (
  <PageLayout
    {...props}
    head={[
      <title>tailwind-webpack-starter - Design System</title>,
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
        <Box as="article" sx="w-full lg:w-2/3 lg:max-w-2xl space-y-16">
          <Heading as="h1" size="4xl" withAnchor>
            Design System
          </Heading>

          <Flex as="section" direction={["column", "row"]}>
            <Box sx="flex-auto">
              <Heading as="h2" size="2xl" withAnchor>
                Spacing scale
              </Heading>
              <SpacingScale items={spacingScale} />
            </Box>
            <Box>
              <Heading as="h2" size="2xl" withAnchor>
                Colors
              </Heading>
              <Colors items={colors} />
            </Box>
          </Flex>

          <Box as="section">
            <Heading as="h2" size="2xl" withAnchor>
              Primitives
            </Heading>
            <Box sx="space-y-4">
              <Collection items={getComponents("primitives")} />
            </Box>
          </Box>

          <Box as="section">
            <Heading as="h2" size="2xl" withAnchor>
              Patterns
            </Heading>
            <Box sx="space-y-4">
              <Collection items={getComponents("patterns")} />
            </Box>
          </Box>

          <Box as="section">
            <Heading as="h2" size="2xl" withAnchor>
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
        ? parseSource({ name: displayName, path, source })
        : "",
      exampleSource: parseSource({ name: "Example", path, source }),
      props: parseProps({
        componentDirectory,
        displayName,
        path,
        source,
      }),
    };
  };
}

function parseSource({ name, path, source }) {
  const exampleIdentifierNode = queryNode({
    source,
    query: `Identifier[name="${name}"]`,
    path,
  });

  if (!exampleIdentifierNode) {
    return;
  }

  const identifierSource = toSource({
    source,
    node: exampleIdentifierNode.parent,
    path,
  });
  let exampleJsxNode = queryNode({
    source: identifierSource,
    query: "JsxElement",
    path,
  });

  if (!exampleJsxNode) {
    exampleJsxNode = queryNode({
      source: identifierSource,
      query: "JsxSelfClosingElement",
      path,
    });

    if (!exampleJsxNode) {
      console.error("queryNode - No nodes found", { source, path });

      return;
    }
  }

  return toSource({ source: identifierSource, node: exampleJsxNode, path });
}

function parseProps({
  componentDirectory,
  displayName,
  path,
  source,
}: {
  componentDirectory: string;
  displayName: string;
  path: string;
  source: string;
}) {
  // This isn't fool proof. It would be better to find specifically a function
  // to avoid matching something else.
  const componentNode = queryNode({
    source,
    query: `Identifier[name="${displayName}"]`,
    path,
  });

  if (!componentNode) {
    return;
  }

  const componentSource = toSource({
    source,
    node: componentNode.parent,
    path,
  });
  const propNodes = queryNodes({
    source: componentSource,
    query: "TypeLiteral PropertySignature",
    path,
  });

  if (propNodes.length) {
    return parseProperties(propNodes);
  }

  // TODO: Likely it would be better to select the first parameter instead
  const typeReferenceNode = queryNode({
    source: componentSource,
    query: `Identifier[name="props"] ~ TypeReference`,
    path,
  });

  if (typeReferenceNode) {
    const referenceType = typeReferenceNode.getText();
    const propertySignatureNodes = queryNodes({
      source: source,
      query: `Identifier[name="${referenceType}"] ~ TypeLiteral > PropertySignature`,
      path,
    });

    if (propertySignatureNodes.length) {
      return parseProperties(propertySignatureNodes);
    }

    const identifierNode = queryNode({
      source,
      query: `Identifier[name="${referenceType}"]`,
      path,
    });

    if (!identifierNode) {
      return;
    }

    // TODO: Tidy up
    // @ts-ignore
    const moduleTarget = identifierNode?.parent?.parent?.parent?.parent?.moduleSpecifier
      ?.getText()
      .replace(/"/g, "");
    const componentPath = _path.join(componentDirectory, `${moduleTarget}.tsx`);

    return parseProps({
      componentDirectory,
      displayName: require(componentPath).displayName,
      path: componentPath,
      source: _fs.readFileSync(componentPath, { encoding: "utf-8" }),
    });
  }
}

function parseProperties(nodes: ts.Node[]) {
  if (!nodes.length) {
    return;
  }

  return nodes.map(
    // @ts-ignore: Figure out the exact type
    ({ name: nameNode, questionToken, type: typeNode }) => {
      const name = nameNode.getText();
      const isOptional = !!questionToken;
      const type = typeNode.getText();

      return { name, isOptional, type };
    }
  );
}

function queryNode({ source, query, path }) {
  const nodes = queryNodes({ source, query, path });

  if (nodes.length) {
    return nodes[0];
  }

  return;
}

function queryNodes({ source, query, path }) {
  const ast = tsquery.ast(source, path, ts.ScriptKind.TSX);

  return tsquery(ast, query, { visitAllChildren: true });
}

function toSource({ path, source, node }) {
  const sourceFile = ts.createSourceFile(
    path,
    source,
    ts.ScriptTarget.ES2015,
    false,
    ts.ScriptKind.TSX
  );
  const printer = ts.createPrinter();

  return prettier
    .format(printer.printNode(ts.EmitHint.Unspecified, node, sourceFile), {
      parser: "typescript",
    })
    .replace(/;/g, "")
    .trim();
}

const Collection = ({ items }) => {
  const componentSources = getComponentSources(items);

  return items
    .map(
      ({ displayName, description, exampleSource, componentSource, props }) => (
        <Box sx="space-y-4">
          <CodeEditor.DemoContainer
            componentSource={componentSource}
            exampleSource={exampleSource}
          >
            <Heading as="h3" size="xl" withAnchor>
              {displayName}
            </Heading>
            <Box as="p">{description ? description : ""}</Box>
            <TabContainer selectedTab="exampleSource">
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
                  <CodeEditor.Editor
                    parent="codeEditor"
                    value="exampleSource"
                    fallback={exampleSource}
                  />
                </TabBodyItem>
                <TabBodyItem tabId="componentSource">
                  <CodeEditor.Editor
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
            </TabContainer>
            {/* TODO: Add a fallback (evaluate code) here to work progressively */}
            <Box
              p="4"
              bg="gray-200"
              sx="rounded-b-lg"
              x={`evaluateCode(codeEditor.exampleSource, '${displayName}', codeEditor.componentSource)`}
            >
              {evaluateCode(componentSources, exampleSource, displayName)}
            </Box>
          </CodeEditor.DemoContainer>
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
          <Box ml="1" sx="w-16">
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
