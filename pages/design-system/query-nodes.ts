import {
  parse,
  print,
} from "https://x.nest.land/swc@0.0.5/mod.ts";

type AstNode = object;
type Query = object;

function queryNodes({ source, query }: { source: string; query: Query }) {
  // @ts-ignore
  const node = parse(source).value;

  // TODO: Check the ast against query match

  // TODO: Capture based on query match
  walkAst({ node, onNode: (node) => console.log(node) });

  return print({
    program: node,
    options: {
      minify: false,
      isModule: true,
    },
  });
}

function walkAst(
  { node, onNode }: { node: AstNode; onNode: (node: AstNode) => void },
) {
  onNode(node);

  // @ts-ignore
  if (node.body) {
    // @ts-ignore
    if (Array.isArray(node.body)) {
      // @ts-ignore
      node.body.forEach((node) => walkAst({ node, onNode }));
    } else {
      // @ts-ignore
      onNode(node.body);
    }
  }
}

export default queryNodes;
