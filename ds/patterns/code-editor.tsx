import * as elements from "typed-html";
import Box from "../primitives/box";
import Text from "../primitives/text";
import * as hljs from "highlight.js";
const html = require("highlight.js/lib/languages/xml");

hljs.registerLanguage("html", html);

function highlight(language, str) {
  return hljs.highlight(language, str).value;
}

const CodeContainer = (
  { sources }: { sources: { [key: string]: string } },
  children: string[]
) => {
  const state = `{ ${Object.entries(sources)
    .map(
      ([name, source]) =>
        `${name}: atob('${Buffer.from(source as string).toString("base64")}')`
    )
    .join(", ")} }`;

  return (
    <Box as="section" x-label="codeEditor" x-state={state}>
      {children.join("")}
    </Box>
  );
};

// TODO: Textarea
const CodeEditor = ({
  parent = "this",
  value = "code",
  fallback,
}: {
  parent?: string;
  value: string;
  fallback: string;
}) => (
  <Box
    p="4"
    bg="gray-800"
    color="white"
    sx="rounded-t-lg overflow-x-auto overflow-y-hidden"
  >
    <Box color="gray-600" sx="float-right select-none">
      <Text size="xs">Editor</Text>
    </Box>
    <Box sx="inline-block font-mono relative">
      <Box
        as="pre"
        mr="16"
        pr="16"
        w="full"
        sx="overflow-hidden"
        x={`highlight('html', ${parent}.${value} || '')`}
      >
        {highlight("html", fallback)}
      </Box>
      <textarea
        class="overflow-hidden absolute min-w-full top-0 left-0 outline-none opacity-50 bg-none whitespace-pre resize-none"
        oninput={`setState({ ${value}: this.value }, { parent: ${
          parent === "this" ? "this" : "'" + parent + "'"
        } })`}
        x={`${parent}.${value}`}
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        x-rows={`${parent}.${value}?.split('\\n').length`}
      ></textarea>
    </Box>
  </Box>
);

export const displayName = "CodeEditor";
export const Example = () => (
  <CodeContainer sources={{ code: "'Type source here'" }}>
    <CodeEditor value="code" fallback="'Type source here'" />
    <Box p="4" bg="gray-200" sx="rounded-b-lg" x="evaluateCode(state.code)" />
  </CodeContainer>
);

export { CodeContainer, CodeEditor };
