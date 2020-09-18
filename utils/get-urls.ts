import { expandGlobSync } from "https://deno.land/std/fs/mod.ts";
import { joinPath, getRelativePath } from "../deps.ts";
import { Urls } from "../types.ts";

function getUrls() {
  const rootPath = joinPath(Deno.cwd(), "pages");
  const ret: Urls = {};

  for (
    const file of expandGlobSync(
      joinPath(rootPath, "**/index.tsx"),
    )
  ) {
    const relativePath = getRelativePath(rootPath, file.path);
    const link = relativePath
      .replace("/index.tsx", "")
      .replace("index.tsx", "/");
    const resolvedLink = link === "/" ? link : `/${link}/`;

    ret[resolvedLink] = file.path;
  }

  return ret;
}

export default getUrls;
