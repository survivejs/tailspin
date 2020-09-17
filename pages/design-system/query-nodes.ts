import {
  parse,
} from "https://x.nest.land/swc@0.0.5/mod.ts";

type AstNode = {
  type: string;
  kind: string;
  span: {
    start: number;
    end: number;
    ctxt: number;
  };
  declare: boolean;
  declarations: AstNode[];
  body?: AstNode[] | AstNode;
};
type Query = { [key in keyof AstNode]?: string };

function queryNodes(
  { source, query }: { source: string; query: Query },
) {
  // @ts-ignore
  const node = parse(source).value;
  const matches: AstNode[] = [];

  walkAst({
    node,
    onNode: (node: AstNode) => {
      if (
        // @ts-ignore: Figure out how to type this
        Object.entries(query).every(([k, v]) => node[k] === v)
      ) {
        matches.push(node);
      }
    },
  });

  return matches;
}

function walkAst(
  { node, onNode }: { node: AstNode; onNode: (node: AstNode) => void },
) {
  onNode(node);

  if (node.body) {
    if (Array.isArray(node.body)) {
      node.body.forEach((node) => walkAst({ node, onNode }));
    } else {
      onNode(node.body);
    }
  }
}

export default queryNodes;
