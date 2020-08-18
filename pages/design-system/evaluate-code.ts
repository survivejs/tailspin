import evaluateJSX from "./evaluate-jsx";

const evaluateCode = (
  componentSources,
  exampleSource,
  componentName?,
  componentSource?
) => {
  if (componentSource) {
    return evaluateJSX(exampleSource, {
      ...componentSources,
      [componentName]: (props, children) =>
        evaluateJSX(componentSource, componentSources, {
          ...props,
          children,
        }),
    });
  }

  return evaluateJSX(exampleSource, componentSources);
};

export default evaluateCode;
