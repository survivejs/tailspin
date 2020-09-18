import { assertEquals } from "../deps.ts";
import getUrls from "./get-urls.ts";

Deno.test("gets urls", () => {
  // TODO: Use a fake fs for testing
  const urls = getUrls();

  assertEquals(Object.keys(urls).length, 3);
});
