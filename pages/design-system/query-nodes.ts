import {
  parse,
} from "https://x.nest.land/swc@0.0.5/mod.ts";
import walkAst from "./walk-ast.ts";
import { AstNode } from "./types.ts";

type Query = { [key in keyof AstNode]?: string };

function queryNodes(
  { source, query }: { source: string; query: Query },
) {
  // @ts-ignore
  const node = parse(source, { syntax: "typescript", tsx: true }).value;
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
