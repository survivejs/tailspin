import { assertEquals, joinPath } from "../deps.ts";
import getComponent from "./get-component.ts";

Deno.test("gets box", async () => {
  const text = await getComponent(
    joinPath(Deno.cwd(), "ds", "primitives", "Text.tsx"),
  );

  console.log(text);

  /*const componentSource = "<div>demo</div>";

  assertEquals(
    parseCode(
      { name: "Demo", source: `const Demo = () => ${componentSource};` },
    ),
    componentSource,
  );*/
});
