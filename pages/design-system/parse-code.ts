import toSource from "./to-source.ts";
import queryNodes from "./query-nodes.ts";

function parseCode(
  { name, source }: { name: any; source: any },
) {
  const exampleIdentifierNodes = queryNodes({
    source,
    // query: `Identifier[name="${name}"]`,
    // TODO
    query: { type: name },
  });
  const exampleIdentifierNode = exampleIdentifierNodes[0];

  if (!exampleIdentifierNodes) {
    return;
  }

  const identifierSource = toSource({
    source,
    // @ts-ignore TODO: Attach parent info
    node: exampleIdentifierNode.parent,
  });
  let exampleJsxNodes = queryNodes({
    source: identifierSource,
    // query: "JsxElement",
    // TODO
    query: {},
  });
  let exampleJsxNode = exampleJsxNodes[0];

  if (!exampleJsxNode) {
    exampleJsxNodes = queryNodes({
      source: identifierSource,
      // query: "JsxSelfClosingElement",
      // TODO
      query: {},
    });
    exampleJsxNode = exampleJsxNodes[0];

    if (!exampleJsxNode) {
      console.error("queryNode - No nodes found", { source });

      return;
    }
  }

  return toSource({ source: identifierSource, node: exampleJsxNode });
}

export default parseCode;
