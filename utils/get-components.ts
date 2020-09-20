import { expandGlobSync, joinPath } from "../deps.ts";
import type { Component } from "../types.ts";
import getComponent from "./get-component.ts";

async function getComponents(type: string) {
  const componentDirectory = joinPath(Deno.cwd(), "ds", type);

  const ret: Component[] = [];

  for (
    const file of expandGlobSync(
      joinPath(componentDirectory, "*.tsx"),
    )
  ) {
    ret.push(await getComponent(componentDirectory, file.path));
  }

  return ret;
}

export default getComponents;
