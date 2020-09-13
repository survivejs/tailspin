import evaluateJSX, { Components } from "./evaluate-jsx.ts";

const evaluateCode = (
  componentSources: Components,
  exampleSource: string,
  componentName: string,
  componentSource?: string,
): string => {
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
