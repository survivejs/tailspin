import { parseSource } from "../deps.ts";
import walkAst from "./walk-ast.ts";
import { AstNode } from "../types.ts";

function printNodes(
  { source }: { source: string },
) {
  walkAst({
    node: parseSource(source),
    onNode: (node: AstNode) => console.log(node),
  });
}

export default printNodes;
