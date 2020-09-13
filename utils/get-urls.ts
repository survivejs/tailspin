import { expandGlobSync } from "https://deno.land/std/fs/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import { Urls } from "../types.ts";

function getUrls() {
  const rootPath = path.posix.join(Deno.cwd(), "pages");
  const ret: Urls = {};

  for (
    const file of expandGlobSync(
      path.posix.join(rootPath, "**/index.tsx"),
    )
  ) {
    const relativePath = path.posix.relative(rootPath, file.path);
    const link = relativePath
      .replace("/index.tsx", "")
      .replace("index.tsx", "/");
    const resolvedLink = link === "/" ? link : `/${link}/`;

    ret[resolvedLink] = file.path;
  }

  return ret;
}

export default getUrls;
