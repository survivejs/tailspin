import { assertEquals } from "../deps.ts";
import parseCode from "./parse-code.ts";

Deno.test("parses simple source", async () => {
  const componentSource = "<div>demo</div>";
  const source = await parseCode(
    { name: "Demo", source: `const Demo = () => ${componentSource};` },
  );

  assertEquals(source, componentSource);
});
