import evaluateCode from "./evaluate-code";

const components = loadComponents(
  require.context("../../ds", true, /^\.\/.*\.tsx$/)
);

// @ts-ignore: TODO: Add this to global
window.evaluateCode = (exampleSource, componentName?, componentSource?) =>
  evaluateCode(components, exampleSource, componentName, componentSource);

function loadComponents(context) {
  const ret = {};

  context.keys().forEach((key) => {
    const {
      displayName,
      default: def,
      showCodeEditor,
      Example,
      ...rest
    } = context(key);

    if (def) {
      ret[displayName] = def;

      Object.keys(def).forEach((k) => {
        ret[`${displayName}.${k}`] = def[k];
      });
    } else {
      Object.entries(rest).forEach(([k, v]) => {
        ret[k] = v;
      });
    }
  });

  return ret;
}
