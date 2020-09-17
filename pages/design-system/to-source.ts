import {
  print,
} from "https://x.nest.land/swc@0.0.5/mod.ts";
import { AstNode } from "./types.ts";

function toSource(node: AstNode) {
  return print(
    {
      program: node,
      options: {
        minify: false,
        isModule: true,
      },
    },
  ).code;
}

export default toSource;
