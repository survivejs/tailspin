import * as elements from "typed-html";
import Box from "./box";
import Link from "./link";
import config from "../../tailwind.json";

type HeadingAs = "h1" | "h2" | "h3" | "h4";
type HeadingSize = keyof typeof config.theme.fontSize;

// https://theme-ui.com/components/heading
// This one is more strict than the reference one and it enforced "as".
const Heading = (
  {
    as,
    size,
    withAnchor,
  }: { as: HeadingAs; size: HeadingSize; withAnchor?: boolean },
  children: string[]
) =>
  withAnchor ? (
    <HeadingWithAnchor as={as} sx={getSizeClass(size)}>
      {children}
    </HeadingWithAnchor>
  ) : (
    <Box as={as} sx={getSizeClass(size)}>
      {children}
    </Box>
  );

function getSizeClass(size: HeadingSize) {
  return `text-${size}`;
}

const ids: { [key: string]: number } = {};

const HeadingWithAnchor = (
  { as, sx }: { as: HeadingAs; sx: string },
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
    <Box sx={sx}>
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
    <Heading as="h1" size="4xl">
      h1 heading
    </Heading>
    <Heading as="h2" size="2xl">
      h2 heading
    </Heading>
    <Heading as="h3" size="xl">
      h3 heading
    </Heading>
    <Heading as="h4" size="lg">
      h4 heading
    </Heading>
    <Heading as="h4" size="md" withAnchor>
      h4 heading with anchor
    </Heading>
  </Box>
);

export default Heading;
