import { printAst } from "../deps.ts";
import { AstNode } from "../types.ts";

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
        isModule: true,
      },
    },
  ).code;
}

export default toSource;
