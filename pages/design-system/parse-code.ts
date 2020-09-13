import * as ts from "typescript";
import * as prettier from "prettier";
import { tsquery } from "@phenomnomnominal/tsquery";

function parseCode({ name, path, source }) {
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

export {
  parseCode as default,
  parseProperties,
  queryNode,
  queryNodes,
  toSource,
};
