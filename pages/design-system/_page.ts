import evaluateJSX from "./evaluate-jsx";

const components = loadComponents(
  require.context("../../ds", true, /^\.\/.*\.tsx$/)
);

const evaluateCode = (code) => evaluateJSX(code, components);

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

// @ts-ignore: TODO: Add this to global
window.updateComponent = (name, code) => {
  if (components[name]) {
    components[name] = (props, children) => {
      // TODO: Handle props
      // TODO: How to let the component parent to know sibling should update?
      // -> Likely the state for both needs to be managed at the parent.
      return evaluateCode(code.replace(/children/g, JSON.stringify(children)));
    };
  }
};
