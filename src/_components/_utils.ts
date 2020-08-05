function constructTailwindClasses(props?: { sx?: string }): string[] {
  if (!props) {
    return [];
  }

  const rules = {
    bg: (bg) => `bg-${bg}`,
    color: (color) => `text-${color}`,
    m: (m) => `m-${m}`,
    mb: (m) => (m > 0 ? `mb-${m}` : `-mb-${Math.abs(m)}`),
    mt: (m) => (m > 0 ? `mt-${m}` : `-mt-${Math.abs(m)}`),
    ml: (m) => (m > 0 ? `ml-${m}` : `-ml-${Math.abs(m)}`),
    mr: (m) => (m > 0 ? `mr-${m}` : `-mr-${Math.abs(m)}`),
    p: (p) => `p-${p}`,
    pb: (p) => `pb-${p}`,
    pt: (p) => `pt-${p}`,
    pl: (p) => `pl-${p}`,
    pr: (p) => `pr-${p}`,
  };

  const ret = Object.entries(props)
    .map(([k, v]) => rules[k]?.(v))
    .filter(Boolean);

  if (props.sx) {
    return ret.concat(props.sx);
  }

  return ret;
}

export { constructTailwindClasses };
