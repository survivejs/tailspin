import defaultTheme from "../default-theme.ts";
import userTheme from "../user-theme.ts";
import resolveUrls from "./resolve-urls.ts";

const isObject = (a: any) => typeof a === "object";

try {
  // TODO: Do a proper merge here
  const expandedConfig = {
    ...defaultTheme,
    ...userTheme,
    colors: expandColors({ ...defaultTheme.colors, ...userTheme.colors }),
    internalLinks: resolveUrls(),
  };

  Deno.writeTextFileSync(
    Deno.cwd() + "/tailwind.ts",
    `export default ${JSON.stringify(expandedConfig, null, 2)};`
  );
} catch (error) {
  console.error(error);
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
