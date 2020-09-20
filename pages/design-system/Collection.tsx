import { elements } from "../../deps.ts";
import type { Component } from "../../types.ts";
import { CodeContainer, CodeEditor } from "../../ds/patterns/CodeEditor.tsx";
import Box from "../../ds/primitives/Box.tsx";
import Stack from "../../ds/primitives/Stack.tsx";
import Heading from "../../ds/primitives/Heading.tsx";
import {
  Tabs,
  TabHeader,
  TabHeaderItem,
  TabBody,
  TabBodyItem,
} from "../../ds/patterns/Tabs.tsx";

// TODO: Restore
// import evaluateCode from "./evaluate-code.ts";
import Types from "./types.tsx";

const Collection = ({ items }: { items: Component[] }) => {
  const componentSources = getComponentSources(items);

  return items
    .map(
      ({ displayName, description, exampleSource, componentSource, props }) => (
        <Stack direction="column" spacing="4">
          <CodeContainer sources={{ componentSource, exampleSource }}>
            <Heading level={3} size="xl" withAnchor>
              {displayName}
            </Heading>
            <Box as="p">{description ? description : ""}</Box>
            <Tabs selectedTab="exampleSource">
              <TabHeader>
                <TabHeaderItem tabId="exampleSource">
                  Example source
                </TabHeaderItem>
                {componentSource
                  ? (
                    <TabHeaderItem tabId="componentSource">
                      Component source
                    </TabHeaderItem>
                  )
                  : (
                    ""
                  )}
                {props?.length > 0
                  ? (
                    <TabHeaderItem tabId="props">Props</TabHeaderItem>
                  )
                  : (
                    ""
                  )}
              </TabHeader>
              <TabBody>
                <TabBodyItem tabId="exampleSource">
                  <CodeEditor
                    parent="codeEditor"
                    value="exampleSource"
                    fallback={exampleSource}
                  />
                </TabBodyItem>
                <TabBodyItem tabId="componentSource">
                  <CodeEditor
                    parent="codeEditor"
                    value="componentSource"
                    fallback={componentSource}
                  />
                </TabBodyItem>
                {props?.length > 0
                  ? (
                    <TabBodyItem tabId="props">
                      <Types props={props} />
                    </TabBodyItem>
                  )
                  : (
                    ""
                  )}
              </TabBody>
            </Tabs>
            {/* TODO: Add a fallback (evaluate code) here to work progressively */}
            <Box
              p="4"
              bg="gray-200"
              sx="rounded-b-lg"
              x={`evaluateCode(codeEditor.exampleSource, '${displayName}', codeEditor.componentSource)`}
            >
              {/*evaluateCode(componentSources, exampleSource, displayName)*/}
            </Box>
          </CodeContainer>
        </Stack>
      ),
    )
    .join("");
};

function getComponentSources(items: Component[]) {
  const ret: { [key: string]: () => string } = {};

  items.forEach(({ displayName, default: def }) => {
    ret[displayName] = def;
  });

  return ret;
}

export default Collection;
