const rules = {
  bg: (bg) => `bg-${bg}`,
  color: (color) => `text-${color}`,
  m: (m) => `m-${m}`,
  mx: (m) => `mx-${m}`,
  my: (m) => `my-${m}`,
  mb: (m) => (m > 0 ? `mb-${m}` : `-mb-${Math.abs(m)}`),
  mt: (m) => (m > 0 ? `mt-${m}` : `-mt-${Math.abs(m)}`),
  ml: (m) => (m > 0 ? `ml-${m}` : `-ml-${Math.abs(m)}`),
  mr: (m) => (m > 0 ? `mr-${m}` : `-mr-${Math.abs(m)}`),
  p: (p) => `p-${p}`,
  px: (p) => `px-${p}`,
  py: (p) => `py-${p}`,
  pb: (p) => `pb-${p}`,
  pt: (p) => `pt-${p}`,
  pl: (p) => `pl-${p}`,
  pr: (p) => `pr-${p}`,
  w: convertToClasses("w"),
  h: convertToClasses("h"),
};

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

function convertToClasses(prefix) {
  return (value) => {
    if (isObject(value)) {
      return Object.entries(value)
        .map(([k, v]) => `${k === "default" ? "" : k + ":"}${prefix}-${v}`)
        .join(" ");
    }

    return `${prefix}-${value}`;
  };
}

const isObject = (a) => typeof a === "object";

export { constructTailwindClasses, tailwindKeys };
