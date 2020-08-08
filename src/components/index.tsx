import _fs from "fs";
import _path from "path";
import * as elements from "typed-html";
import glob from "glob";
import Page from "../_layouts/page";
import Box from "../_primitives/box";
import Heading from "../_primitives/heading";

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
          <Collection items={getComponents("_primitives")} />

          <Heading as="h2">Patterns</Heading>
          <Collection items={getComponents("_patterns")} />
        </Box>
      </Box>
    }
  />
);

function getComponents(type) {
  return glob
    .sync(_path.join(__dirname, "..", `${type}/*.tsx`))
    .map((path) => ({
      ...require(path),
      path,
      source: _fs.readFileSync(path, { encoding: "utf-8" }),
    }));
}

const Collection = ({ items }) =>
  items
    .map(({ displayName, Example, source }) => (
      <Box mb="4">
        <Heading as="h3">{displayName}</Heading>
        <EditableExample Example={Example} source={source} />
      </Box>
    ))
    .join("");

const EditableExample = ({ Example, source }) => {
  // TODO: decodedExample should be parsed from source
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
        <Example />
      </div>
    </section>
  );
};

export default Components;
