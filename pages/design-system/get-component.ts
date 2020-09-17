import parseCode from "./parse-code.ts";
import parseProps from "./parse-props.ts";

async function getComponent(componentDirectory: string, componentPath: string) {
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
