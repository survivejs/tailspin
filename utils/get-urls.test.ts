import { assertEquals } from "../deps.ts";
import getUrls from "./get-urls.ts";

Deno.test("gets urls", async () => {
  // TODO: Use a fake fs for testing
  const urls = await getUrls();

  assertEquals(Object.keys(urls).length, 5);
});
