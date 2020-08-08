import * as elements from "typed-html";
import { constructTailwindClasses } from "./_utils";

// TODO: Type check internal links passed to href
const Link = (props: { href: string; sx?: string }, label) => (
  <a href={props.href} class={constructTailwindClasses(props).join(" ")}>
    {label}
  </a>
);

export const displayName = "Link";
export const Example = () => (
  <Link href="https://github.com/survivejs/tailwind-webpack-starter">
    Star at GitHub
  </Link>
);

export default Link;
