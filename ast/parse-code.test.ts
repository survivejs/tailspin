import { assertEquals } from "../deps.ts";
import parseCode from "./parse-code.ts";

Deno.test("parses simple source", async () => {
  const componentSource = "<div>demo</div>";

  assertEquals(
    await parseCode(
      { name: "Demo", source: `const Demo = () => ${componentSource};` },
    ),
    componentSource,
  );
});
