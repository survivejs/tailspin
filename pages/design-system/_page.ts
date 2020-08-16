import evaluateJSX from "./evaluate-jsx";

const components = loadComponents(
  require.context("../../ds", true, /^\.\/.*\.tsx$/)
);

const evaluateCode = (exampleSource, componentName?, componentSource?) => {
  // TODO: Refine this by doing children + prop replacement within evaluateJSX against AST
  if (componentSource) {
    return evaluateJSX(exampleSource, {
      ...components,
      [componentName]: (props, children) =>
        evaluateJSX(
          componentSource.replace(/children/g, JSON.stringify(children)),
          components
        ),
    });
  }

  return evaluateJSX(exampleSource, components);
};

// @ts-ignore: TODO: Add this to global
window.evaluateCode = evaluateCode;

function loadComponents(context) {
  const ret = {};

  context.keys().forEach((key) => {
    const { displayName, default: def } = context(key);

    ret[displayName] = def;

    Object.keys(def).forEach((k) => {
      ret[`${displayName}.${k}`] = def[k];
    });
  });

  return ret;
}
