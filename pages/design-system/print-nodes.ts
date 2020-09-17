import {
  parse,
} from "https://x.nest.land/swc@0.0.5/mod.ts";
import walkAst from "./walk-ast.ts";
import { AstNode } from "./types.ts";

function printNodes(
  { source }: { source: string },
) {
  // @ts-ignore
  const { value: node, type } = parse(source);
  const matches: AstNode[] = [];

  // TODO: Extract to a helper
  if (type !== "ok") {
    throw new Error("printNodes - Failed to parse source");
  }

  walkAst({
    node,
    onNode: (node: AstNode) => console.log(node),
  });

  return matches;
}

export default printNodes;
