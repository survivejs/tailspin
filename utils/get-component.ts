import { parseCode, parseProps } from "../deps.ts";
import type { Component } from "../types.ts";

async function getComponent(
  componentPath: string,
): Promise<Component> {
  const source = Deno.readTextFileSync(componentPath);
  const component = await import(componentPath);
  const { displayName } = component;

  return {
    ...component,
    source,
    componentSource: component.showCodeEditor
      ? await parseCode({ name: displayName, source })
      : "",
    exampleSource: await parseCode({ name: "Example", source }),
    props: await parseProps({
      componentPath,
      displayName,
      source,
    }),
  };
}

export default getComponent;
