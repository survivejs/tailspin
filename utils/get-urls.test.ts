import { assertEquals } from "../deps.ts";
import getUrls from "./get-urls.ts";

Deno.test("gets urls", async () => {
  const urls = await getUrls();

  assertEquals(Object.keys(urls).length > 0, true);
});
