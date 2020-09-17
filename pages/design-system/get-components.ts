import * as _path from "https://deno.land/std/path/mod.ts";
import { expandGlobSync } from "https://deno.land/std/fs/mod.ts";
import getComponent from "./get-component.ts";

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

export default getComponents;
