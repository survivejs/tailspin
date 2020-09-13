import evaluateComponentCode from "./evaluate-code";

const components = loadComponents(
  require.context("../../ds", true, /^\.\/.*\.tsx$/),
);

const evaluateCode = (
  exampleSource: string,
  componentName: string,
  componentSource?: string,
): string =>
  evaluateComponentCode(
    components,
    exampleSource,
    componentName,
    componentSource,
  );

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

declare global {
  interface Window {
    evaluateCode: typeof evaluateCode;
  }
}

window.evaluateCode = evaluateCode;
