import * as elements from "typed-html";
import Box from "../primitives/box";
import List from "./list";

const Toc = () => (
  <Box
    sx="sticky top-0"
    x-label="parent"
    x-state="{ closest: {}, headings: Array.from(document.querySelectorAll('h2, h3')) }"
    x-closest="{ state: { closest: document.querySelectorAll('h2, h3') } }"
  >
    <List type="none">
      <Box as="template" x-each="headings">
        <List.Item>
          <Box
            as="a"
            x-href="'#' + state.id"
            x="state.textContent"
            x-class="[
              state.textContent === parent.closest.textContent && 'font-bold',
              state.tagName === 'H3' && 'ml-2'
            ]"
          ></Box>
        </List.Item>
      </Box>
    </List>
  </Box>
);

export const description = `Toc (table of contents) constructs its contents based on h2 and h3 elements while maintaining active state while the page is scrolled.`;
export const displayName = "Toc";
export const Example = () => <Toc />;
export const showCodeEditor = true;

export default Toc;
