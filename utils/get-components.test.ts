import { assertEquals } from "../deps.ts";
import getComponents from "./get-components.ts";

Deno.test("gets primitives", async () => {
  const primitives = await getComponents("primitives");

  assertEquals(primitives.length > 0, true);
});

Deno.test("gets patterns", async () => {
  const patterns = await getComponents("patterns");

  assertEquals(patterns.length > 0, true);
});

Deno.test("gets layouts", async () => {
  const layouts = await getComponents("layouts");

  assertEquals(layouts.length > 0, true);
});
