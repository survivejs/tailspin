function constructTailwindClasses(props?: { classes?: string[] }): string[] {
  if (!props) {
    return [];
  }

  const rules = {
    bg: (bg) => `bg-${bg}`,
    color: (color) => `text-${color}`,
    p: (p) => `p-${p}`,
  };

  const ret = Object.entries(props)
    .map(([k, v]) => rules[k]?.(v))
    .filter(Boolean);

  if (props.classes) {
    return ret.concat(props.classes);
  }

  return ret;
}

function objectToStyle(styles?: object): string {
  if (!styles) {
    return "";
  }

  return Object.entries(styles)
    .map(([k, v]) => `${k}: ${v}`)
    .join(";");
}

export { constructTailwindClasses, objectToStyle };
