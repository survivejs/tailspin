import { parseCode, parseProps } from "../deps.ts";
import type { Component } from "../types.ts";

async function getComponent(
  componentDirectory: string,
  componentPath: string,
): Promise<Component> {
  const source = Deno.readTextFileSync(componentPath);
  const component = await import(componentPath);
  const { displayName } = component;

  return {
    ...component,
    source,
    componentSource: component.showCodeEditor
      ? parseCode({ name: displayName, source })
      : "",
    exampleSource: parseCode({ name: "Example", source }),
    props: await parseProps({
      componentDirectory,
      displayName,
      source,
    }),
  };
}

export default getComponent;
