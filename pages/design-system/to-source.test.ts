import {
  assertEquals,
} from "https://deno.land/std@0.69.0/testing/asserts.ts";
import queryNodes from "./query-nodes.ts";
import toSource from "./to-source.ts";

Deno.test("prints component source", () => {
  const source = "const Demo = () => <div>demo</div>;";
  const type = "VariableDeclaration";

  const printedSource = toSource(queryNodes({ source, query: { type } })[0]);

  console.log(printedSource);

  // assertEquals(matches.length, 1);
});
