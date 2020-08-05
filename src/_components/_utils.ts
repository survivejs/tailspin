function constructTailwindClasses(props?: object): string[] {
  if (!props) {
    return [];
  }

  const rules = {
    bg: (bg) => `bg-${bg}`,
    color: (color) => `text-${color}`,
    p: (p) => `p-${p}`,
  };

  return Object.entries(props)
    .map(([k, v]) => rules[k]?.(v))
    .filter(Boolean);
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
