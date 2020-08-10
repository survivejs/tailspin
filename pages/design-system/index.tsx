import _fs from "fs";
import _path from "path";
import * as elements from "typed-html";
import * as ts from "typescript";
import * as prettier from "prettier";
import { tsquery } from "@phenomnomnominal/tsquery";
import readableColor from "polished/lib/color/readableColor";
import glob from "glob";
import Page from "../../ds/layouts/page";
import CodeEditor from "../../ds/patterns/code-editor";
import Table from "../../ds/patterns/table";
import Toc from "../../ds/patterns/toc";
import Flex from "../../ds/primitives/flex";
import Box from "../../ds/primitives/box";
import Heading from "../../ds/primitives/heading";
import config from "../../tailwind.json";

const theme = config.theme;
const colors = theme.colors;
const spacingScale = Object.keys(theme.spacing);

const DesignSystemPage = (props) => (
  <Page
    {...props}
    head={[
      <title>tailwind-webpack-starter - Design System</title>,
      <meta
        name="description"
        content="tailwind-webpack-starter combines webpack with Tailwind and provides a starting point for site projects"
      ></meta>,
    ]}
    body={
      <Flex as="main" sx="lg:m-8">
        <Box as="aside" sx="hidden lg:inline lg:w-1/3">
          <Toc />
        </Box>
        <Box as="article" sx="w-full lg:w-2/3 lg:max-w-2xl space-y-16">
          <Heading.withAnchor as="h1">Design System</Heading.withAnchor>

          <Flex as="section" sx="flex-col sm:flex-row">
            <Box sx="flex-auto">
              <Heading.withAnchor as="h2">Spacing scale</Heading.withAnchor>
              <SpacingScale items={spacingScale} />
            </Box>
            <Box>
              <Heading.withAnchor as="h2">Colors</Heading.withAnchor>
              <Colors items={colors} />
            </Box>
          </Flex>

          <Box as="section">
            <Heading.withAnchor as="h2">Primitives</Heading.withAnchor>
            <Box sx="space-y-4">
              <Collection items={getComponents("primitives")} />
            </Box>
          </Box>

          <Box as="section">
            <Heading.withAnchor as="h2">Patterns</Heading.withAnchor>
            <Box sx="space-y-4">
              <Collection items={getComponents("patterns")} />
            </Box>
          </Box>

          <Box as="section">
            <Heading.withAnchor as="h2">Layouts</Heading.withAnchor>
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

    return {
      ...component,
      path,
      source,
      exampleSource: parseExample({ path, source }),
      props: parseProps({
        componentDirectory,
        displayName: component.displayName,
        path,
        source,
      }),
    };
  };
}

function parseExample({ path, source }) {
  const exampleIdentifierNode = queryNode({
    source,
    query: `Identifier[name="Example"]`,
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

  // TODO: Perform a lookup for Flex
  // In Flex, it's a TypeReference (identifier: props) that's pointing to ImportSpecifier with identifier BoxProps, the problem then is to parse BoxProps from the file where it points.

  // TODO: Likely it would be better to select the first parameter instead
  const referenceNode = queryNode({
    source: componentSource,
    query: `Identifier[name="props"] ~ TypeReference`,
    path,
  });

  if (referenceNode) {
    const referenceType = referenceNode.getText();
    const propertySignatureNodes = queryNodes({
      source: source,
      query: `Identifier[name="${referenceType}"] ~ TypeLiteral > PropertySignature`,
      path,
    });

    if (propertySignatureNodes.length) {
      return parseProperties(propertySignatureNodes);
    }

    if (displayName === "Flex") {
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
      const component = require(_path.join(componentDirectory, moduleTarget));

      // TODO: Figure out how to dig the type from the target (recursion)
      console.log("got flex", moduleTarget, component);
    }
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

const Collection = ({ items }) =>
  items
    .map(({ displayName, description, exampleSource, props }) => (
      <Box sx="space-y-4">
        <Heading.withAnchor as="h3">{displayName}</Heading.withAnchor>
        <Box as="p">{description ? description : ""}</Box>
        <CodeEditor source={exampleSource} />
        <Types props={props} />
      </Box>
    ))
    .join("");

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
        <Flex>
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
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Is optional</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props
          .map(({ name, isOptional, type }) => (
            <Table.Row>
              <Table.BodyCell>
                <Box as="code">{name}</Box>
              </Table.BodyCell>
              <Table.BodyCell>{type}</Table.BodyCell>
              <Table.BodyCell>{isOptional ? "✓" : ""}</Table.BodyCell>
            </Table.Row>
          ))
          .join("")}
      </Table.Body>
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
