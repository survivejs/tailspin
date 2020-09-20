import { printAst } from "../deps.ts";
import queryNodes from "./query-nodes.ts";

async function parseCode(
  { name, source }: { name: string; source: string },
) {
  const identifierNodes = await queryNodes({
    source,
    query: {
      type: "Identifier",
      value: name,
    },
  });

  if (identifierNodes.length) {
    const identifierParent = identifierNodes[0].parent;

    const jsxNodes = await queryNodes({
      node: identifierParent,
      query: {
        type: "JSXElement",
      },
    });

    if (jsxNodes.length) {
      return printAst(jsxNodes[0].node);
    }
  }

  return Promise.resolve("");
}

export default parseCode;
