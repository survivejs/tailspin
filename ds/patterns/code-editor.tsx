import * as elements from "typed-html";
import Box from "../primitives/box";

const CodeEditor = ({
  source,
  onUpdate,
}: {
  source?: string;
  onUpdate: string;
}) => (
  <Container source={source} value="code">
    <Editor value="code" />
    <Box p="4" bg="gray-200" sx="rounded-b-lg" x={onUpdate} />
  </Container>
);

// TODO: Likely this should be removed through better abstraction (Container)
const DemoContainer = (
  {
    componentSource,
    exampleSource,
    sx,
  }: { componentSource: string; exampleSource: string; sx?: string },
  children: string[]
) => {
  const decodedComponentSource = Buffer.from(componentSource).toString(
    "base64"
  );
  const decodedExampleSource = Buffer.from(exampleSource).toString("base64");

  return (
    <Box
      as="section"
      x-label="codeEditor"
      x-state={`{ componentSource: atob('${decodedComponentSource}'), exampleSource: atob('${decodedExampleSource}') }`}
      sx={sx}
    >
      {children.join("")}
    </Box>
  );
};
CodeEditor.DemoContainer = DemoContainer;

const Container = (
  { source, sx, value }: { source?: string; sx?: string; value: string },
  children: string[]
) => {
  if (!source) {
    return null;
  }

  const decodedExample = Buffer.from(source).toString("base64");

  return (
    <Box
      as="section"
      x-state={`{ ${value}: atob('${decodedExample}') }`}
      sx={sx}
    >
      {children.join("")}
    </Box>
  );
};
CodeEditor.Container = Container;

// TODO: Textarea
const Editor = ({
  parent = "this",
  value = "code",
}: {
  parent?: string;
  value: string;
}) => (
  <Box
    p="4"
    bg="gray-800"
    color="white"
    sx="rounded-t-lg overflow-x-auto overflow-y-hidden"
  >
    <Box color="gray-600" sx="float-right select-none text-xs">
      Editor
    </Box>
    <Box sx="inline-block font-mono relative">
      <Box
        as="pre"
        mr="16"
        pr="16"
        sx="overflow-hidden w-full"
        x={`highlight('html', ${parent}.${value} || '')`}
      />
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
CodeEditor.Editor = Editor;

export const displayName = "CodeEditor";
export const Example = () => (
  <CodeEditor source="'Type source here'" onUpdate="evaluateCode(state.code)" />
);

export default CodeEditor;
