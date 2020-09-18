import { assertEquals } from "../deps.ts";
import queryNodes from "./query-nodes.ts";
import toSource from "./to-source.ts";
import printNode from "./print-node.ts";

Deno.test("prints component source", () => {
  const source = "const Demo = () => <div>demo</div>;";
  const type = "VariableDeclaration";
  const node = queryNodes({ source, query: { type } })[0];

  // console.log(printNode(node));

  const printedSource = toSource(node);

  console.log(printedSource);

  // assertEquals(matches.length, 1);
});
