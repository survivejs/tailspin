import { printAst } from "../deps.ts";
import queryNodes from "./query-nodes.ts";

async function parseCode(
  { name, source }: { name: string; source: string },
) {
  // console.log(JSON.stringify(ast, null, 2));

  const identifierNodes = await queryNodes({
    source,
    query: {
      "type": "Identifier",
      value: name,
    },
  });

  if (identifierNodes.length) {
    const identifierNode = identifierNodes[0];

    console.log("found identifier node");
  }

  // TODO
  return Promise.resolve();
  /*
  const exampleIdentifierNodes = await queryNodes({
    source,
    // query: `Identifier[name="${name}"]`,
    // TODO
    query: { type: name },
  });
  const exampleIdentifierNode = exampleIdentifierNodes[0];

  if (!exampleIdentifierNodes) {
    return;
  }

  const identifierSource = await printAst(
    // @ts-ignore TODO: Attach parent info
    exampleIdentifierNode.parent,
  );
  let exampleJsxNodes = await queryNodes({
    source: identifierSource,
    // query: "JsxElement",
    // TODO
    query: {},
  });
  let exampleJsxNode = exampleJsxNodes[0];

  if (!exampleJsxNode) {
    exampleJsxNodes = await queryNodes({
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

  return printAst(exampleJsxNode);*/
}

export default parseCode;
