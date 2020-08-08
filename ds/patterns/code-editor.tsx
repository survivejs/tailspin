import * as elements from "typed-html";

// TODO: Use Box instead of divs etc. Textarea might need a component of its own.
const CodeEditor = ({ source }: { source?: string }) => {
  if (!source) {
    return null;
  }

  const decodedExample = Buffer.from(source).toString("base64");

  return (
    <section x-state={`{ code: atob('${decodedExample}') }`}>
      <div class="p-4 bg-gray-800 text-white rounded-t-lg overflow-x-auto overflow-y-hidden">
        <div class="float-right select-none text-xs text-gray-600">Editor</div>
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
            x-rows="state.code.split('\n').length"
          ></textarea>
        </div>
      </div>
      <div
        class="p-4 bg-gray-200 rounded-b-lg"
        x="evaluateCode(state.code)"
      ></div>
    </section>
  );
};

export const displayName = "CodeEditor";
export const Example = () => <CodeEditor source="" />;

export default CodeEditor;
