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
  h: convertToClasses("h"),
};

function supportNegative(prefix, v) {
  return v > 0 ? `${prefix}-${v}` : `-${prefix}-${Math.abs(v)}`;
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
    if (isObject(value)) {
      return Object.entries(value)
        .map(
          ([k, v]) =>
            `${k === "default" ? "" : k + ":"}${customizeValue(prefix, v)}`
        )
        .join(" ");
    }

    return customizeValue(prefix, value);
  };
}

function defaultValue(prefix, value) {
  return `${prefix}-${value}`;
}

const isObject = (a) => typeof a === "object";

export { constructTailwindClasses, tailwindKeys };
