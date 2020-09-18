import { assertEquals } from "../deps.ts";
import queryNodes from "./query-nodes.ts";
import toSource from "./to-source.ts";

Deno.test("prints component source", () => {
  const source = "const Demo = () => <div>demo</div>;";
  const type = "ArrowFunctionExpression"; // "VariableDeclaration";
  const node = queryNodes({ source, query: { type } })[0];

  console.log(JSON.stringify(node, null, 2));

  const printedSource = toSource(node);

  console.log(printedSource);

  // assertEquals(matches.length, 1);
});
