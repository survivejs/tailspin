import { assertEquals, elements } from "../../deps.ts";
import Box from "./Box.tsx";

// TODO: Figure out why Deno.test doesn't work in tsx
// Deno.test("renders an empty div", async () => {
assertEquals(<Box>hello</Box>, "<div>hello</div>");
// });
