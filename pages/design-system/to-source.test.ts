import {
  assertEquals,
} from "https://deno.land/std@0.69.0/testing/asserts.ts";
import queryNodes from "./query-nodes.ts";
import toSource from "./to-source.ts";

Deno.test("prints component source", () => {
  const source = "const Demo = () => <div>demo</div>;";
  const type = "VariableDeclaration";

  const printedSource = toSource(
    queryNodes(
      { source, query: { type } },
    )[0],
  );

  // TODO: Figure this out
  // https://github.com/nestdotland/deno_swc/blob/master/examples/print.ts
  console.log(printedSource);

  // assertEquals(matches.length, 1);
});
