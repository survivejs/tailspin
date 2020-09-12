import { expandGlobSync } from "https://deno.land/std/fs/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import defaultTheme from "../default-theme.ts";
import userTheme from "../user-theme.ts";

const isObject = (a: any) => typeof a === "object";

try {
  // TODO: Do a proper merge here
  const expandedConfig = {
    ...defaultTheme,
    ...userTheme,
    colors: expandColors({ ...defaultTheme.colors, ...userTheme.colors }),
    internalLinks: getInternalLinks(),
  };

  Deno.writeTextFileSync(
    Deno.cwd() + "/tailwind.ts",
    `export default ${JSON.stringify(expandedConfig, null, 2)};`
  );
} catch (error) {
  console.error(error);
}

function getInternalLinks() {
  const rootPath = path.posix.join(Deno.cwd(), "pages");
  const ret: { [key: string]: string } = {};

  for (const file of expandGlobSync(
    path.posix.join(rootPath, "**/index.tsx")
  )) {
    const relativePath = path.posix.relative(rootPath, file.path);
    const link = relativePath
      .replace("/index.tsx", "")
      .replace("index.tsx", "/");
    const resolvedLink = link === "/" ? link : `/${link}/`;

    ret[resolvedLink] = resolvedLink;
  }

  return ret;
}

type Colors = { [key: string]: string | { [key: string]: string } };

function expandColors(colors: Colors) {
  const ret: Colors = {};

  // This assumes one level of nesting so no recursion is needed
  Object.entries(colors).forEach(([key, value]) => {
    if (isObject(value)) {
      Object.entries(value).forEach(([k, v]) => {
        ret[`${key}-${k}`] = v;
      });
    } else {
      ret[key] = value;
    }
  });

  return ret;
}
