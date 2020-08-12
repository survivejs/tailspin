import evaluateJSX from "./evaluate-jsx";

const components = loadComponents(
  require.context("../../ds", true, /^\.\/.*\.tsx$/)
);

// @ts-ignore: TODO: Add this to global
window.evaluateCode = (code) => evaluateJSX(code, components);

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
