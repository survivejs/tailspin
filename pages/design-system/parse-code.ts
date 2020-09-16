import {
  parseTypescript,
  print,
} from "https://x.nest.land/swc@0.3.0-rc.1/mod.ts";

/*
import * as ts from "../../node_modules/typescript/lib/typescript.d.ts"; // "https://cdn.skypack.dev/typescript@4.0.2?dts";
import { tsquery } from "https://unpkg.com/@phenomnomnominal/tsquery@4.1.1/dist/src/index.js";
*/

function parseCode(
  { name, path, source }: { name: any; path: any; source: any },
) {
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
    },
  );
}

function queryNode(
  { path, source, query }: { path: any; source: any; query: any },
) {
  const nodes = queryNodes({ source, query, path });

  if (nodes.length) {
    return nodes[0];
  }

  return;
}

function queryNodes(
  { path, source, query }: { path: any; source: any; query: any },
) {
  const ast = tsquery.ast(source, path, ts.ScriptKind.TSX);

  return tsquery(ast, query, { visitAllChildren: true });
}

export {
  parseCode as default,
  parseProperties,
  queryNode,
  queryNodes,
};
