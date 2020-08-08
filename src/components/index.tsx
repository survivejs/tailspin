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

const Components = ({ htmlAttributes, cssTags, jsTags }) => (
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
        <Box as="article" sx="w-full mx-auto max-w-3xl">
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

const Collection = ({ items }) =>
  items
    .map(({ displayName, Example }) => (
      <Box mb="4">
        <Heading as="h3">{displayName}</Heading>
        <EditableExample Example={Example} />
      </Box>
    ))
    .join("");

const EditableExample = ({ Example }) => {
  // TODO: The problem is that this converts to HTML. The transformation
  // needs to occur later for this to make sense.
  const example = Example();
  const decodedExample = Buffer.from(example).toString("base64");

  return (
    <section x-state={`{ code: atob('${decodedExample}') }`}>
      <div class="p-4 bg-gray-800 text-white rounded-t-lg overflow-x-auto overflow-y-hidden">
        <div class="inline-block font-mono relative">
          <pre
            class="overflow-hidden mr-16 pr-16 w-full"
            x="highlight('html', state.code)"
          ></pre>
          <textarea
            class="overflow-hidden absolute min-w-full top-0 left-0 outline-none opacity-50 bg-none whitespace-pre resize-none"
            oninput="setState({ code: this.value })"
            x="state.code"
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            spellcheck="false"
            x-rows="state.code.split('\\n').length"
          ></textarea>
        </div>
      </div>
      <div class="p-4 bg-gray-200 rounded-b-lg" x="state.code">
        ${example}
      </div>
    </section>
  );
};

export default Components;
