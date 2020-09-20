import { assertEquals, joinPath } from "../deps.ts";
import getComponent from "./get-component.ts";

Deno.test("gets text", async () => {
  const text = await getComponent(
    joinPath(Deno.cwd(), "ds", "primitives", "Text.tsx"),
  );

  console.log(text);

  assertEquals(text.displayName, "Text");
});
