import {
  parse as parseSwcSource,
  print as printAst,
} from "https://x.nest.land/swc@0.0.5/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import { expandGlobSync } from "https://deno.land/std/fs/mod.ts";
import {
  assertEquals,
} from "https://deno.land/std@0.69.0/testing/asserts.ts";
import * as elements from "./src/elements.ts";
import parseCode from "./ast/parse-code.ts";
import parseProps from "./ast/parse-props.ts";
import queryNodes from "./ast/query-nodes.ts";
import toSource from "./ast/to-source.ts";
import getComponents from "./utils/get-components.ts";
import processMarkdown from "./utils/process-markdown.ts";
import { AstNode } from "./types.ts";

const joinPath = path.posix.join;
const getRelativePath = path.posix.relative;

// TODO: Check for error object and throw
const parseSource = (source: string): AstNode => {
  // @ts-ignore
  const { value, type } = parseSwcSource(
    source,
    { syntax: "typescript", tsx: true },
  );

  // TODO: Extract to a helper
  if (type !== "ok") {
    throw new Error("parseSource - Failed to parse source");
  }

  return value;
};

export {
  assertEquals,
  expandGlobSync,
  elements,
  joinPath,
  getComponents,
  getRelativePath,
  parseCode,
  parseProps,
  parseSource,
  printAst,
  processMarkdown,
  queryNodes,
  toSource,
};
