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

    const extraPagesPath = joinPath(fileDir, "_pages.ts");

    let pages = [];
    if (existsSync(extraPagesPath)) {
      pages = (await import(extraPagesPath)).default();

      pages.forEach((
        { url }: { url: string },
      ) => {
        // TODO: Figure out what data to pass here. There should be enough
        // to load the content through a layout
        ret[`${resolvedUrl}${url}/`] = { path: undefined, pages: [] };
      });
    }

    ret[resolvedUrl] = { path: file.path, pages };
  }

  return ret;
}

export default getUrls;
