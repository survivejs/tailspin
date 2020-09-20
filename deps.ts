import * as path from "https://deno.land/std/path/mod.ts";
import { expandGlobSync, existsSync } from "https://deno.land/std/fs/mod.ts";
import { assertEquals } from "https://deno.land/std@0.69.0/testing/asserts.ts";
import {
  setup as setupOceanwind,
  getStyleTag,
  VirtualInjector,
  themed,
} from "https://unpkg.com/@bebraw/oceanwind@0.2.6";
import { Application } from "https://deno.land/x/oak@v6.2.0/mod.ts";
import * as elements from "./src/elements.ts";
import parseCode from "./ast/parse-code.ts";
import parseProps from "./ast/parse-props.ts";
import queryNodes from "./ast/query-nodes.ts";
import getComponents from "./utils/get-components.ts";
import processMarkdown from "./utils/process-markdown.ts";
import type { AstNode } from "./types.ts";

const joinPath = path.posix.join;
const getDirectory = path.posix.dirname;
const getRelativePath = path.posix.relative;

const printAst = async (ast: AstNode): Promise<string> =>
  fetch(`http://localhost:4000/print?ast="${JSON.stringify(ast)}"`).then((
    res,
  ) => res.text());

const parseSource = async (source: string): Promise<AstNode> =>
  fetch(`http://localhost:4000/parse?source="${btoa(JSON.stringify(source))}"`)
    .then((
      res,
    ) => res.json());

const getStyleInjector = () => {
  const injector = VirtualInjector();

  setupOceanwind({ injector });

  return injector;
};

export {
  assertEquals,
  expandGlobSync,
  elements,
  joinPath,
  existsSync,
  getComponents,
  getDirectory,
  getRelativePath,
  parseCode,
  parseProps,
  parseSource,
  printAst,
  processMarkdown,
  queryNodes,
  themed,
  getStyleInjector,
  getStyleTag,
  Application,
};
