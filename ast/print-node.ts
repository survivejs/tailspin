import walkAst from "./walk-ast.ts";
import { AstNode } from "../types.ts";

function printNodes(node: AstNode) {
  walkAst({ node, onNode: (node: AstNode) => console.log(node) });
}

export default printNodes;
