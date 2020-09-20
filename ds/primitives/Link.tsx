import { elements } from "../../deps.ts";
import { constructTailwindClasses } from "./_utils.ts";
import type config from "../../tailwind.ts";
import Box from "./Box.tsx";
import Flex from "./Flex.tsx";

type InternalLinks = keyof typeof config.internalLinks;

export type LinkProps = { href: InternalLinks; sx?: string };

const Link = (props: LinkProps, label: string[]) => (
  <LinkExternal {...props}>{label}</LinkExternal>
);

export type ExternalLinkProps = { href: string; sx?: string };

const LinkExternal = (props: ExternalLinkProps, label: string[]) => (
  <a href={props.href} class={constructTailwindClasses(props, ["underline"])}>
    {label}
  </a>
);
Link.withExternal = LinkExternal;

export const description =
  `Regular Links are meant to be used internally and they are type-checked. The external variant omits type-checking and you should check those links using another tool.`;
export const displayName = "Link";
export const Example = () => (
  <Flex direction="column">
    <Box>
      <Link href="/design-system/">Design system</Link>
    </Box>
    <Box>
      <Link.withExternal
        href="https://github.com/survivejs/tailwind-webpack-starter"
      >
        Star at GitHub
      </Link.withExternal>
    </Box>
  </Flex>
);

export default Link;
