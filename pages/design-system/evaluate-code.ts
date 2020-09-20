import evaluateJSX, { Components } from "./evaluate-jsx.ts";

// TODO: Redo
const evaluateCode = async (
  componentSources: Components,
  exampleSource: string,
  componentName: string,
  componentSource?: string,
): Promise<string> => {
  if (componentSource) {
    return evaluateJSX(exampleSource, {
      ...componentSources,
      [componentName]: (props: { [key: string]: any }, children: string[]) =>
        evaluateJSX(componentSource, componentSources, {
          ...props,
          children,
        }),
    });
  }

  return evaluateJSX(exampleSource, componentSources);
};

export default evaluateCode;
