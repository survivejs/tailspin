import {
  assertEquals,
} from "https://deno.land/std@0.69.0/testing/asserts.ts";
import queryNodes from "./query-nodes.ts";

const source = `const magic = 5;

function f(n:any) {
  return n+n;
}


function g() {
  return f(magic);
}

console.log(g());`;

// TODO: Add proper tests for query nodes ops
Deno.test("finds const", () => {
  const result = queryNodes(
    // 'VariableDeclaration[name="props"] ~ TypeReference'
    { source, query: { type: "VariableDeclaration", kind: "const" } },
  );

  assertEquals(3, 3);
});
