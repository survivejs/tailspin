import { AstNode } from "./types.ts";

function walkAst(
  { node, onNode }: { node: AstNode; onNode: (node: AstNode) => void },
) {
  onNode(node);

  if (node.body) {
    if (Array.isArray(node.body)) {
      node.body.forEach((node) => walkAst({ node, onNode }));
    } else if (node.body) {
      onNode(node.body);
    }
  }
  if (node.declarations) {
    if (Array.isArray(node.declarations)) {
      node.declarations.forEach((node) => walkAst({ node, onNode }));
    }
  }
  if (node.init) {
    walkAst({ node: node.init, onNode });
  }
}

export default walkAst;
