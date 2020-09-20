import defaultTheme from "../default-theme.ts";
import userTheme from "../user-theme.ts";
import getUrls from "./get-urls.ts";

const isObject = (a: any) => typeof a === "object";

async function generateMeta() {
  await generateInitialMeta();
  await generateAllMeta();
}

async function generateInitialMeta() {
  try {
    // TODO: Do a proper merge here
    const expandedConfig = {
      ...defaultTheme,
      ...userTheme,
      extendedColors: { ...defaultTheme.colors, ...userTheme.colors },
      colors: expandColors({ ...defaultTheme.colors, ...userTheme.colors }),
      // TODO: Find a way to generate the definition without executing code since the
      // code depends on it. Maybe it's better to push the check to the system instead of ts
      // as that can handle external links as well.
      internalLinks: { "/": {}, "/blog/": {}, "/design-system/": {} },
    };

    Deno.writeTextFileSync(
      Deno.cwd() + "/tailwind.ts",
      `export default ${JSON.stringify(expandedConfig, null, 2)};`,
    );
  } catch (error) {
    console.error(error);
  }
}

async function generateAllMeta() {
  try {
    // TODO: Do a proper merge here
    const expandedConfig = {
      ...defaultTheme,
      ...userTheme,
      extendedColors: { ...defaultTheme.colors, ...userTheme.colors },
      colors: expandColors({ ...defaultTheme.colors, ...userTheme.colors }),
      internalLinks: await getUrls(),
    };

    Deno.writeTextFileSync(
      Deno.cwd() + "/tailwind.ts",
      `export default ${JSON.stringify(expandedConfig, null, 2)};`,
    );
  } catch (error) {
    console.error(error);
  }
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

// TODO: Detect if this is run from outside or exposed as a module
generateMeta();
