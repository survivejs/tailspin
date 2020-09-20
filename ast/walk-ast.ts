import type { AstNode } from "../types.ts";

function walkAst(
  { node, onNode, parent }: {
    node: AstNode;
    onNode: (node: AstNode, parent?: AstNode) => void;
    parent?: AstNode;
  },
) {
  onNode(node, parent);

  if (node.body) {
    if (Array.isArray(node.body)) {
      node.body.forEach((child) => {
        walkAst({ node: child, onNode, parent: node });
      });
    } else if (node.body) {
      onNode(node.body, node);
    }
  }
  if (node.declarations) {
    if (Array.isArray(node.declarations)) {
      node.declarations.forEach((child) => {
        walkAst({ node: child, onNode, parent: node });
      });
    }
  }
  if (node.expression) {
    walkAst({ node: node.expression, onNode, parent: node });
  }
  if (node.id) {
    walkAst({ node: node.id, onNode, parent: node });
  }
  if (node.init) {
    walkAst({ node: node.init, onNode, parent: node });
  }
}

export default walkAst;
