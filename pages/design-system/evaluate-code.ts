import evaluateJSX from "./evaluate-jsx";

const evaluateCode = (
  componentSources,
  exampleSource,
  componentName?,
  componentSource?
) => {
  // TODO: Refine this by doing children + prop replacement within evaluateJSX against AST
  if (componentSource) {
    return evaluateJSX(exampleSource, {
      ...componentSources,
      [componentName]: (props, children) =>
        evaluateJSX(
          componentSource.replace(/children/g, JSON.stringify(children)),
          componentSources
        ),
    });
  }

  return evaluateJSX(exampleSource, componentSources);
};

export default evaluateCode;
