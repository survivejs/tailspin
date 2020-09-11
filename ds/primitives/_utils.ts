// import * as otion from "otion/dev";
import { themed } from "https://unpkg.com/@bebraw/oceanwind@0.2.4";
import userTheme from "../../user-theme.ts";

const ow = themed(userTheme);

const rules = {
  bg: convertToClasses("bg"),
  color: convertToClasses("text"),
  m: convertToClasses("m"),
  mx: convertToClasses("mx"),
  my: convertToClasses("my"),
  mb: convertToClasses("mb", supportNegative),
  mt: convertToClasses("mt", supportNegative),
  ml: convertToClasses("ml", supportNegative),
  mr: convertToClasses("mr", supportNegative),
  p: convertToClasses("p"),
  px: convertToClasses("px"),
  py: convertToClasses("py"),
  pb: convertToClasses("pb"),
  pt: convertToClasses("pt"),
  pl: convertToClasses("pl"),
  pr: convertToClasses("pr"),
  w: convertToClasses("w"),
  minw: convertToClasses("min-w"),
  maxw: convertToClasses("max-w"),
  h: convertToClasses("h"),
  minh: convertToClasses("min-h"),
  maxh: convertToClasses("max-h"),
};

function supportNegative(
  mediaQuery: string,
  prefix: string,
  v: string | number
) {
  return v > 0
    ? `${mediaQuery ? mediaQuery + ":" : ""}${prefix}-${v}`
    : `-${prefix}-${Math.abs(v as number)}`;
}

const tailwindKeys = Object.keys(rules);

function constructTailwindClasses(
  props?: { sx?: string },
  classes?: string[]
): string[] {
  if (!props) {
    return [];
  }

  const ret = Object.entries(props)
    // @ts-ignore TODO: Figure out how to type this.
    .map(([k, v]) => rules[k]?.(v))
    .filter(Boolean);

  if (props.sx) {
    return ret.concat(props.sx).concat(classes);
  }

  return ret.concat(classes);
}

function convertToClasses(prefix: string, customizeValue = defaultValue) {
  return (value?: string) => {
    if (!value) {
      return "";
    }

    if (isObject(value)) {
      return ow(
        Object.entries(value).map(([k, v]) =>
          customizeValue(k === "default" ? "" : k, prefix, v)
        )
      );
    }

    return ow([customizeValue("", prefix, value)]);
  };
}

function defaultValue(
  mediaQuery: string,
  prefix: string,
  value: string | number
) {
  return `${mediaQuery ? mediaQuery + ":" : ""}${prefix}-${value}`;
}

const isObject = (a: any) => typeof a === "object";

// https://deno.land/x/30_seconds_of_typescript@v1.0.1/docs/omit.md
const omit = (obj: { [key: string]: any }, ...arr: string[]) =>
  Object.keys(obj)
    .filter((k) => !arr.includes(k))
    .reduce(
      (acc, key) => ((acc[key] = obj[key]), acc),
      {} as { [key: string]: any }
    );

export {
  constructTailwindClasses,
  convertToClasses,
  tailwindKeys,
  isObject,
  omit,
};
