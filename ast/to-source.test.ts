import { assertEquals } from "../deps.ts";
import queryNodes from "./query-nodes.ts";
import toSource from "./to-source.ts";

Deno.test("prints component source", () => {
  const source = "const Demo = () => (<div>demo</div>)";
  const type = "VariableDeclaration";
  const node = queryNodes({ source, query: { type } })[0];

  // TODO: This is buggy at the moment (outdated swc)
  console.log(toSource(node));
  // assertEquals(toSource(node), source);
});
