import {
  joinPath,
  getDirectory,
  getRelativePath,
  expandGlobSync,
  existsSync,
} from "../deps.ts";
import type { Urls } from "../types.ts";

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
      const extraPages = await import(extraPagesPath);
      const layout = extraPages.layout;

      const extras = await Promise.resolve(extraPages.getPages());
      pages = extras.map((
        { url, ...attributes }: { url: string },
      ) => {
        ret[joinPath(resolvedUrl, url)] = {
          layout,
          path: undefined,
          pages: [],
          attributes,
        };

        return { ...attributes };
      });
    }

    ret[resolvedUrl] = { path: file.path, pages, attributes: {} };
  }

  return ret;
}

export default getUrls;
