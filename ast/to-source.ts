import { printAst } from "../deps.ts";
import { AstNode } from "../types.ts";

// TODO: Note that the printer is limited to only very specific nodes for now
// since it's using an outdated swc. https://github.com/nestdotland/deno_swc
// would need to be updated to support more node types.
function toSource(node: AstNode) {
  return printAst(
    {
      program: {
        type: "Module",
        span: { start: 0, end: 35, ctxt: 0 },
        body: [node],
      },
      options: {
        minify: false,
        isModule: false,
      },
    },
  ).code;
}

export default toSource;
