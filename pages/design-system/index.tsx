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
import Flex from "../../ds/primitives/flex";
import Box from "../../ds/primitives/box";
import Heading from "../../ds/primitives/heading";
import config from "../../tailwind.json";

const theme = config.theme;
const colors = theme.colors;
const spacingScale = Object.keys(theme.spacing);

const Components = ({ htmlAttributes, cssTags, jsTags }) => (
  <Page
    htmlAttributes={htmlAttributes}
    cssTags={cssTags}
    jsTags={jsTags}
    head={[
      <title>tailwind-webpack-starter - Design System</title>,
      <meta
        name="description"
        content="tailwind-webpack-starter combines webpack with Tailwind and provides a starting point for site projects"
      ></meta>,
    ]}
    body={
      <Box as="main">
        <Box as="article" sx="w-full mx-auto max-w-3xl space-y-8">
          <Heading as="h1">Design System</Heading>

          <Flex as="section" sx="flex-col sm:flex-row">
            <Box sx="flex-auto">
              <Heading as="h2">Spacing scale</Heading>
              <SpacingScale items={spacingScale} />
            </Box>
            <Box>
              <Heading as="h2">Colors</Heading>
              <Colors items={colors} />
            </Box>
          </Flex>

          <Box as="section">
            <Heading as="h2">Primitives</Heading>
            <Box sx="space-y-4">
              <Collection items={getComponents("primitives")} />
            </Box>
          </Box>

          <Box as="section">
            <Heading as="h2">Patterns</Heading>
            <Box sx="space-y-4">
              <Collection items={getComponents("patterns")} />
            </Box>
          </Box>

          <Box as="section">
            <Heading as="h2">Layouts</Heading>
            <Box sx="space-y-4">
              <Collection items={getComponents("layouts")} />
            </Box>
          </Box>
        </Box>
      </Box>
    }
  />
);

function getComponents(type) {
  return glob
    .sync(_path.join(__dirname, "..", "..", "ds", `${type}/*.tsx`))
    .map((path) => {
      const source = _fs.readFileSync(path, { encoding: "utf-8" });
      const component = require(path);

      return {
        ...component,
        path,
        source,
        exampleSource: parseExample({ path, source }),
        props: parseProps({ displayName: component.displayName, path, source }),
      };
    });
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

function parseProps({ displayName, path, source }) {
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

  if (!propNodes.length) {
    return;
  }

  // TODO: Get Identifier, QuestionToken, and StringKeyword for each
  // and construct types based on that.
  console.log("juho - type node", displayName, propNodes);
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

  return tsquery(ast, query);
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
    .map(({ displayName, exampleSource }) => (
      <Box>
        <Heading as="h3">{displayName}</Heading>
        <CodeEditor source={exampleSource} />
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

export default Components;
