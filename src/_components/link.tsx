import * as elements from "typed-html";
import { constructTailwindClasses } from "./_utils";

// TODO: Type check internal links passed to href
export default (props: { href: string; sx?: string }, label) => (
  <a href={props.href} class={constructTailwindClasses(props).join(" ")}>
    {label}
  </a>
);
