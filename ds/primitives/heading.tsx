import * as elements from "typed-html";
import Box from "./box";
import Flex from "./flex";
import Link from "./link";
import config from "../../tailwind.json";

type HeadingLevel = 1 | 2 | 3 | 4;
type HeadingSize = keyof typeof config.theme.fontSize;

// TODO: Support responsive syntax
// https://theme-ui.com/components/heading
// This one is more strict than the reference one and it enforced "as".
const Heading = (
  {
    level,
    size,
    withAnchor,
  }: { level: HeadingLevel; size: HeadingSize; withAnchor?: boolean },
  children: string[]
) =>
  withAnchor ? (
    <HeadingWithAnchor level={level} sx={getSizeClass(size)}>
      {children}
    </HeadingWithAnchor>
  ) : (
    // @ts-ignore
    <Box as={`h${level}`} sx={getSizeClass(size)}>
      {children}
    </Box>
  );

function getSizeClass(size: HeadingSize) {
  return `text-${size}`;
}

const ids: { [key: string]: number } = {};

const HeadingWithAnchor = (
  { level, sx }: { level: HeadingLevel; sx: string },
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
    // @ts-ignore
    <Flex as={`h${level}`} direction="row" id={id} sx={sx}>
      <Link.withExternal
        href={`#${id}`}
        sx={`-ml-${
          { 1: 6, 2: 5, 3: 4, 4: 4 }[level]
        } text-primary absolute hover:secondary cursor-pointer no-underline after-hash`}
      ></Link.withExternal>
      {/* @ts-ignore */}
      <Box as="span">{children}</Box>
    </Flex>
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
    <Heading level={1} size="4xl">
      h1 heading
    </Heading>
    <Heading level={2} size="2xl">
      h2 heading
    </Heading>
    <Heading level={3} size="xl">
      h3 heading
    </Heading>
    <Heading level={4} size="lg">
      h4 heading
    </Heading>
    <Heading level={4} size="base" withAnchor>
      h4 heading with anchor
    </Heading>
  </Box>
);

export default Heading;
