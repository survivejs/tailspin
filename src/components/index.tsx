import _fs from "fs";
import _path from "path";
import * as elements from "typed-html";
import * as ts from "typescript";
import * as prettier from "prettier";
import { tsquery } from "@phenomnomnominal/tsquery";
import glob from "glob";
import Page from "../_layouts/page";
import Box from "../_primitives/box";
import Heading from "../_primitives/heading";

const Components = ({ htmlAttributes, cssTags, jsTags }) => (
  <Page
    htmlAttributes={htmlAttributes}
    cssTags={cssTags}
    jsTags={jsTags}
    head={[
      <title>tailwind-webpack-starter</title>,
      <meta
        name="description"
        content="tailwind-webpack-starter combines webpack with Tailwind and provides a starting point for site projects"
      ></meta>,
    ]}
    body={
      <Box as="main">
        <Box as="article" sx="w-full mx-auto max-w-3xl">
          <Heading as="h1">Available components</Heading>

          <Heading as="h2">Primitives</Heading>
          <Collection items={getComponents("_primitives")} />

          <Heading as="h2">Patterns</Heading>
          <Collection items={getComponents("_patterns")} />
        </Box>
      </Box>
    }
  />
);

function getComponents(type) {
  return glob.sync(_path.join(__dirname, "..", `${type}/*.tsx`)).map((path) => {
    const source = _fs.readFileSync(path, { encoding: "utf-8" });

    return {
      ...require(path),
      path,
      source,
      exampleSource: parseExample({ path, source }),
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
  const exampleJsxNode = queryNode({
    source: identifierSource,
    query: "JsxElement",
    path,
  });

  if (!exampleJsxNode) {
    return;
  }

  return toSource({ source: identifierSource, node: exampleJsxNode, path });
}

function queryNode({ source, query, path }) {
  const ast = tsquery.ast(source, path, ts.ScriptKind.TSX);
  const nodes = tsquery(ast, query);

  if (nodes.length) {
    return nodes[0];
  }

  console.error("queryNode - No nodes found");

  return;
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
      <Box mb="4">
        <Heading as="h3">{displayName}</Heading>
        <EditableExample source={exampleSource} />
      </Box>
    ))
    .join("");

const EditableExample = ({ source }) => {
  const decodedExample = Buffer.from(source).toString("base64");

  // TODO: Evaluation logic (this needs to go to _page.ts as a global)
  return (
    <section x-state={`{ code: atob('${decodedExample}') }`}>
      <div class="p-4 bg-gray-800 text-white rounded-t-lg overflow-x-auto overflow-y-hidden">
        <div class="inline-block font-mono relative">
          <pre
            class="overflow-hidden mr-16 pr-16 w-full"
            x="highlight('html', state.code)"
          ></pre>
          <textarea
            class="overflow-hidden absolute min-w-full top-0 left-0 outline-none opacity-50 bg-none whitespace-pre resize-none"
            oninput="setState({ code: this.value })"
            x="state.code"
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            spellcheck="false"
            x-rows="state.code.split('\n').length"
          ></textarea>
        </div>
      </div>
      <div
        class="p-4 bg-gray-200 rounded-b-lg"
        x="evaluateCode(state.code)"
      ></div>
    </section>
  );
};

export default Components;
