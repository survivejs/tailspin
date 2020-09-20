import evaluateComponentCode from "./evaluate-code.ts";
import type { Components } from "./evaluate-jsx.ts";

const evaluateCode = (
  exampleSource: string,
  componentName: string,
  componentSource?: string,
): string =>
  evaluateComponentCode(
    window.components,
    exampleSource,
    componentName,
    componentSource,
  );

// TODO: Inject to a global at the host
/*
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
*/

declare global {
  interface Window {
    // Components should be injected to a global by the host
    components: Components;
    evaluateCode: typeof evaluateCode;
  }
}

window.evaluateCode = evaluateCode;
