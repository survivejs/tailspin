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

function supportNegative(mediaQuery, prefix, v) {
  return v > 0
    ? `${mediaQuery ? mediaQuery + ":" : ""}${prefix}-${v}`
    : `-${prefix}-${Math.abs(v)}`;
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
    .map(([k, v]) => rules[k]?.(v))
    .filter(Boolean);

  if (props.sx) {
    return ret.concat(props.sx).concat(classes);
  }

  return ret.concat(classes);
}

function convertToClasses(prefix, customizeValue = defaultValue) {
  return (value) => {
    if (!value) {
      return "";
    }

    if (isObject(value)) {
      return Object.entries(value)
        .map(([k, v]) => customizeValue(k === "default" ? "" : k, prefix, v))
        .join(" ");
    }

    return customizeValue("", prefix, value);
  };
}

function defaultValue(mediaQuery: string, prefix: string, value: unknown) {
  return `${mediaQuery ? mediaQuery + ":" : ""}${prefix}-${value}`;
}

const isObject = (a) => typeof a === "object";

export { constructTailwindClasses, convertToClasses, tailwindKeys };
