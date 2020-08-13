import * as elements from "typed-html";
import Box from "../primitives/box";

// TODO: Use Box instead of divs etc.
const CodeEditor = ({
  source,
  onUpdate,
}: {
  source?: string;
  onUpdate: string;
}) => (
  <Container source={source}>
    <Box
      p="4"
      bg="gray-800"
      color="white"
      sx="rounded-t-lg overflow-x-auto overflow-y-hidden"
    >
      <Box color="gray-600" sx="float-right select-none text-xs">
        Editor
      </Box>
      <Editor />
    </Box>
    <Box p="4" bg="gray-200" sx="rounded-b-lg" x={onUpdate}></Box>
  </Container>
);

const Container = ({ source }: { source?: string }, children: string[]) => {
  if (!source) {
    return null;
  }

  const decodedExample = Buffer.from(source).toString("base64");

  return (
    <Box as="section" x-state={`{ code: atob('${decodedExample}') }`}>
      {children.join("")}
    </Box>
  );
};
CodeEditor.Container = Container;

// TODO: Textarea
const Editor = () => (
  <Box sx="inline-block font-mono relative">
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
      x-rows="state.code.split('\n').length"
    ></textarea>
  </Box>
);
CodeEditor.Editor = Editor;

export const displayName = "CodeEditor";
export const Example = () => (
  <CodeEditor source="'Type source here'" onUpdate="evaluateCode(state.code)" />
);

export default CodeEditor;
