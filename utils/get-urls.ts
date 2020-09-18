import {
  joinPath,
  getDirectory,
  getRelativePath,
  expandGlobSync,
  existsSync,
} from "../deps.ts";
import { Urls } from "../types.ts";

async function getUrls() {
  const rootPath = joinPath(Deno.cwd(), "pages");
  const ret: Urls = {};

  for (
    const file of expandGlobSync(joinPath(rootPath, "**/index.tsx"))
  ) {
    const fileDir = getDirectory(file.path);
    const relativePath = getRelativePath(rootPath, file.path);
    const link = relativePath
      .replace("/index.tsx", "")
      .replace("index.tsx", "/");
    const resolvedUrl = link === "/" ? link : `/${link}/`;

    // TODO: if extra pages exist, attach them to a page object here
    ret[resolvedUrl] = file.path;

    const extraPagesPath = joinPath(fileDir, "_pages.ts");

    if (existsSync(extraPagesPath)) {
      (await import(extraPagesPath)).default().forEach((
        { url }: { url: string },
      ) => {
        // TODO: Figure out what data to pass here. There should be enough
        // to load the content through a layout
        ret[`${resolvedUrl}${url}/`] = undefined;
      });
    }
  }

  return ret;
}

export default getUrls;
