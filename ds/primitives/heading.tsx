import * as elements from "typed-html";
import Box from "./box";
import Link from "./link";

type HeadingProps = "h1" | "h2" | "h3" | "h4";

// https://theme-ui.com/components/heading
// This one is more strict than the reference one and it enforced "as".
const Heading = (
  { as, withAnchor }: { as: HeadingProps; withAnchor?: boolean },
  children: string[]
) =>
  withAnchor ? (
    <HeadingWithAnchor as={as}>{children}</HeadingWithAnchor>
  ) : (
    <Box as={as}>{children}</Box>
  );

const ids: { [key: string]: number } = {};

const HeadingWithAnchor = (
  { as }: { as: HeadingProps },
  children: string[]
) => {
  let id = slugify(children.join(""));

  if (ids[id]) {
    ids[id]++;

    id += `-${ids[id]}`;
  } else {
    ids[id] = 1;
  }

  return (
    <Box>
      <Box as={as} sx="inline" id={id}>
        {children}
      </Box>
      <Box ml="2" color="primary" sx="inline hover:secondary cursor-pointer">
        <Link.withExternal href={`#${id}`}>#</Link.withExternal>
      </Box>
    </Box>
  );
};

const slugify = (idBase: string) =>
  idBase
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/[^\w]+/g, "-");

export const displayName = "Heading";
export const Example = () => (
  <Box>
    <Heading as="h1">h1 heading</Heading>
    <Heading as="h2">h2 heading</Heading>
    <Heading as="h3">h3 heading</Heading>
    <Heading as="h4">h4 heading</Heading>
    <Heading as="h4" withAnchor={true}>
      h4 heading with anchor
    </Heading>
  </Box>
);

export default Heading;
