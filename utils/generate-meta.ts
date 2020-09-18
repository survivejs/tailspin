import defaultTheme from "../default-theme.ts";
import userTheme from "../user-theme.ts";
import getUrls from "./get-urls.ts";

const isObject = (a: any) => typeof a === "object";

// TODO: This has to work in two passes - first to generate the file
// and then to get source so that dependencies can be resolved during
// runtime. Another option would be to declare dependencies outside
// within a configuration files.
async function generateMeta() {
  try {
    // TODO: Do a proper merge here
    const expandedConfig = {
      ...defaultTheme,
      ...userTheme,
      extendedColors: { ...defaultTheme.colors, ...userTheme.colors },
      colors: expandColors({ ...defaultTheme.colors, ...userTheme.colors }),
      internalLinks: getUrls(),
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
