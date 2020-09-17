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

  const identifierSource = toSource(
    // @ts-ignore TODO: Attach parent info
    exampleIdentifierNode.parent,
  );
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

  return toSource(exampleJsxNode);
}

export default parseCode;
