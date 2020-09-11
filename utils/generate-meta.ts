import defaultTheme from "../default-theme.ts";
import userTheme from "../user-theme.ts";

const isObject = (a: any) => typeof a === "object";

try {
  // TODO: Do a proper merge here
  const expandedConfig = {
    ...defaultTheme,
    ...userTheme,
    colors: expandColors({ ...defaultTheme.colors, ...userTheme.colors }),
    // internalLinks: getInternalLinks(),
  };

  Deno.writeTextFileSync(
    Deno.cwd() + "/tailwind.ts",
    `export default ${JSON.stringify(expandedConfig, null, 2)};`
  );
} catch (error) {
  console.error(error);
}

// TODO: Restore
/*
function getInternalLinks() {
  const pagesRoot = path.join(__dirname, "..", "pages");
  const pagesGlob = path.join(pagesRoot, "**", "index.tsx");
  const internalLinks = glob
    .sync(pagesGlob)
    .map((p) => path.relative(pagesRoot, p))
    .map((p) => p.replace("/index.tsx", "").replace("index.tsx", "/"))
    .map((p) => (p === "/" ? p : `/${p}/`));
  const ret = {};

  internalLinks.forEach((link) => {
    ret[link] = link;
  });

  return ret;
}
*/

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
