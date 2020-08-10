import * as elements from "typed-html";
import { constructTailwindClasses } from "./_utils";
import config from "../../tailwind.json";
import Box from "./box";
import Flex from "./flex";

type InternalLinks = keyof typeof config.internalLinks;

const Link = (props: { href: InternalLinks; sx?: string }, label: string[]) => (
  <LinkExternal {...props}>{label}</LinkExternal>
);

const LinkExternal = (
  props: { href: string; sx?: string },
  label: string[]
) => (
  <a href={props.href} class={constructTailwindClasses(props).join(" ")}>
    {label}
  </a>
);
Link.withExternal = LinkExternal;

export const description = `Regular Links are meant to be used internally and they are type-checked. The external variant omits type-checking and you should check those links using another tool.`;
export const displayName = "Link";
export const Example = () => (
  <Flex sx="flex-col">
    <Box>
      <Link href="/design-system/">Design system</Link>
    </Box>
    <Box>
      <Link.withExternal href="https://github.com/survivejs/tailwind-webpack-starter">
        Star at GitHub
      </Link.withExternal>
    </Box>
  </Flex>
);

export default Link;
