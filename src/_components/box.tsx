import * as elements from "typed-html";

// https://theme-ui.com/components/box
export default (
  {
    p,
    color,
    bg,
    sx,
  }: { p?: number; color?: string; bg?: string; sx?: object } = {},
  children
) => (
  <div
    class={constructTailwindClasses({ p, color, bg })}
    style={objectToStyle(sx)}
  >
    {children}
  </div>
);

function constructTailwindClasses(props) {
  const rules = {
    bg: (bg) => `bg-${bg}`,
    color: (color) => `text-${color}`,
    p: (p) => `p-${p}`,
  };

  return Object.entries(props)
    .map(([k, v]) => rules[k]?.(v))
    .filter(Boolean)
    .join(" ");
}

function objectToStyle(styles) {
  return styles
    ? Object.entries(styles)
        .map(([k, v]) => `${k}: ${v}`)
        .join(";")
    : "";
}
