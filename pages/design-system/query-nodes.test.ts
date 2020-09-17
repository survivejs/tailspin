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

Deno.test("finds const", () => {
  const type = "VariableDeclaration";
  const kind = "const";
  const matches = queryNodes(
    { source, query: { type, kind } },
  );

  assertEquals(matches.length, 1);
  assertEquals(matches[0].type, type);
  assertEquals(matches[0].kind, kind);
});

Deno.test("finds functions", () => {
  const type = "FunctionDeclaration";
  const matches = queryNodes(
    { source, query: { type } },
  );

  assertEquals(matches.length, 2);
});
