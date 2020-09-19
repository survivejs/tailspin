import { assertEquals } from "../deps.ts";
import queryNodes from "./query-nodes.ts";

const source = `const magic = 5;

function f(n:any) {
  return n+n;
}


function g() {
  return f(magic);
}

console.log(g());`;

Deno.test("finds a const", async () => {
  const type = "VariableDeclaration";
  const kind = "const";
  const matches = await queryNodes(
    { source, query: { type, kind } },
  );

  assertEquals(matches.length, 1);
  assertEquals(matches[0].type, type);
  assertEquals(matches[0].kind, kind);
});

Deno.test("finds functions", async () => {
  const type = "FunctionDeclaration";
  const matches = await queryNodes(
    { source, query: { type } },
  );

  assertEquals(matches.length, 2);
});

Deno.test("finds component source", async () => {
  const source = "const Demo = () => <div>demo</div>;";
  const type = "ArrowFunctionExpression";

  const matches = await queryNodes(
    { source, query: { type } },
  );

  assertEquals(matches.length, 1);
});
