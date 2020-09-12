import ow from "../ow.ts";

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
  props?: { class?: string; sx?: string },
  classes?: string[]
): string {
  if (!props) {
    return "";
  }

  const combinedClasses = Object.entries(props)
    // @ts-ignore TODO: Figure out how to type this.
    .map(([k, v]) => rules[k]?.(v))
    .concat(props.sx ? props.sx.split(" ") : [])
    .concat(classes)
    .filter(Boolean);

  // Likely Oceanwind should be fine with an empty array
  return (combinedClasses.length ? ow([combinedClasses.join(" ")]) : "").concat(
    props.class ? " " + props.class.split(" ").join(" ") : ""
  );
}

function convertToClasses(prefix: string, customizeValue = defaultValue) {
  return (value?: any) => {
    if (!value) {
      return "";
    }

    if (isObject(value)) {
      return Object.entries(value).map(([k, v]) =>
        customizeValue(k === "default" ? "" : k, prefix, v as string)
      );
    }

    return customizeValue("", prefix, value);
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
