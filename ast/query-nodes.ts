import { parseSource } from "../deps.ts";
import type { AstNode } from "../types.ts";
import walkAst from "./walk-ast.ts";

type Query = { [key in keyof AstNode]?: string };

async function queryNodes(
  { node, source, query }: { node?: AstNode; source?: string; query: Query },
) {
  const matches: { node: AstNode; parent?: AstNode }[] = [];

  if (!node && !source) {
    return [];
  }

  walkAst({
    // @ts-ignore: Find a better way to pass either node or source
    node: node || await parseSource(source),
    onNode: (node: AstNode, parent?: AstNode) => {
      if (
        // @ts-ignore: Figure out how to type this
        Object.entries(query).every(([k, v]) => node[k] === v)
      ) {
        matches.push({ node, parent });
      }
    },
  });

  return matches;
}

export default queryNodes;
