import * as _path from "https://deno.land/std/path/mod.ts";
import { expandGlobSync } from "https://deno.land/std/fs/mod.ts";

import parseCode from "./parse-code.ts";
import parseProps from "./parse-props.ts";

async function getComponents(type: string) {
  const componentDirectory = _path.posix.join(Deno.cwd(), "ds", type);

  const ret = [];

  for (
    const file of expandGlobSync(
      _path.posix.join(componentDirectory, "*.tsx"),
    )
  ) {
    ret.push(await getComponent(componentDirectory, file.path));
  }

  return ret;
}

async function getComponent(componentDirectory: string, componentPath: string) {
  const source = Deno.readTextFileSync(componentPath);
  const component = await import(componentPath);
  const { displayName } = component;

  return {
    ...component,
    path: componentPath,
    source,
    componentSource: component.showCodeEditor
      ? parseCode({ name: displayName, path: componentPath, source })
      : "",
    exampleSource: parseCode({ name: "Example", path: componentPath, source }),
    props: await parseProps({
      componentDirectory,
      displayName,
      path: componentPath,
      source,
    }),
  };
}

export default getComponents;
