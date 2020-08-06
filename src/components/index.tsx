import * as elements from "typed-html";
import Page from "../_layouts/page";
import Box, * as BoxMeta from "../_primitives/box";
import * as FlexMeta from "../_primitives/flex";
import * as ButtonMeta from "../_primitives/button";
import Heading, * as HeadingMeta from "../_primitives/heading";
import * as LinkMeta from "../_primitives/link";
import * as AlertMeta from "../_patterns/alert";
import * as NavigationMeta from "../_patterns/navigation";

const primitives = [BoxMeta, FlexMeta, ButtonMeta, HeadingMeta, LinkMeta];
const patterns = [AlertMeta, NavigationMeta];

const Collection = ({ items }) =>
  items
    .map(({ displayName, Example }) => (
      <Box mb="4">
        <Heading as="h3">{displayName}</Heading>
        <Example />
      </Box>
    ))
    .join("");

export default ({ htmlAttributes, cssTags, jsTags }) => (
  <Page
    htmlAttributes={htmlAttributes}
    cssTags={cssTags}
    jsTags={jsTags}
    head={[
      <title>tailwind-webpack-starter</title>,
      <meta
        name="description"
        content="tailwind-webpack-starter combines webpack with Tailwind and provides a starting point for site projects"
      ></meta>,
    ]}
    body={
      <Box as="main">
        <Box as="article" sx="w-full mx-auto prose lg:prose-xl">
          <Heading as="h1">Available components</Heading>

          <Heading as="h2">Primitives</Heading>
          <Collection items={primitives} />

          <Heading as="h2">Patterns</Heading>
          <Collection items={patterns} />
        </Box>
      </Box>
    }
  />
);
