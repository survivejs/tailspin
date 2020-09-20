import { assertEquals } from "../deps.ts";
import getComponents from "./get-components.ts";

Deno.test("gets primitives", async () => {
  const primitives = await getComponents("primitives");

  // console.log(primitives);

  /*const componentSource = "<div>demo</div>";

  assertEquals(
    parseCode(
      { name: "Demo", source: `const Demo = () => ${componentSource};` },
    ),
    componentSource,
  );*/
});

Deno.test("gets patterns", async () => {
  const patterns = await getComponents("patterns");

  // console.log(patterns);

  /*const componentSource = "<div>demo</div>";

  assertEquals(
    parseCode(
      { name: "Demo", source: `const Demo = () => ${componentSource};` },
    ),
    componentSource,
  );*/
});

Deno.test("gets layouts", async () => {
  const layouts = await getComponents("layouts");

  // console.log(layouts);

  /*const componentSource = "<div>demo</div>";

  assertEquals(
    parseCode(
      { name: "Demo", source: `const Demo = () => ${componentSource};` },
    ),
    componentSource,
  );*/
});
