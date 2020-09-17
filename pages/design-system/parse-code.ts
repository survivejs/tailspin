import toSource from "./to-source.ts";
import queryNodes from "./query-nodes.ts";

function parseCode(
  { name, path, source }: { name: any; path: any; source: any },
) {
  const exampleIdentifierNodes = queryNodes({
    source,
    query: `Identifier[name="${name}"]`,
    path,
  });
  const exampleIdentifierNode = exampleIdentifierNodes[0];

  if (!exampleIdentifierNodes) {
    return;
  }

  const identifierSource = toSource({
    source,
    node: exampleIdentifierNode.parent,
  });
  let exampleJsxNodes = queryNodes({
    source: identifierSource,
    query: "JsxElement",
    path,
  });
  let exampleJsxNode = exampleJsxNodes[0];

  if (!exampleJsxNode) {
    exampleJsxNodes = queryNodes({
      source: identifierSource,
      query: "JsxSelfClosingElement",
      path,
    });
    exampleJsxNode = exampleJsxNodes[0];

    if (!exampleJsxNode) {
      console.error("queryNode - No nodes found", { source, path });

      return;
    }
  }

  return toSource({ source: identifierSource, node: exampleJsxNode });
}

export default parseCode;
