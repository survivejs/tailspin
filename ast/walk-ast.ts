import type { AstNode } from "../types.ts";

function walkAst(
  { node, onNode }: { node: AstNode; onNode: (node: AstNode) => void },
) {
  onNode(node);

  if (node.body) {
    if (Array.isArray(node.body)) {
      node.body.forEach((child) => {
        child.parent = node;

        walkAst({ node: child, onNode });
      });
    } else if (node.body) {
      node.body.parent = node;

      onNode(node.body);
    }
  }
  if (node.declarations) {
    if (Array.isArray(node.declarations)) {
      node.declarations.forEach((child) => {
        child.parent = node;

        walkAst({ node: child, onNode });
      });
    }
  }
  if (node.id) {
    node.id.parent = node;

    walkAst({ node: node.id, onNode });
  }
  if (node.init) {
    node.init.parent = node;

    walkAst({ node: node.init, onNode });
  }
}

export default walkAst;
