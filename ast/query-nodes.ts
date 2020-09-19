import { parseSource } from "../deps.ts";
import { AstNode } from "../types.ts";
import walkAst from "./walk-ast.ts";

type Query = { [key in keyof AstNode]?: string };

async function queryNodes(
  { source, query }: { source: string; query: Query },
) {
  const node = await parseSource(source);
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

export default queryNodes;
