import * as elements from "typed-html";
import Box from "../primitives/box";

const Sidebar = () => (
  <Box
    sx="sticky top-0"
    x-label="parent"
    x-state="{ closest: {}, headings: Array.from(document.querySelectorAll('h2, h3')) }"
    x-closest="{ state: { closest: document.querySelectorAll('h2, h3') } }"
  >
    <Box as="ul">
      <Box as="template" x-each="headings">
        <Box as="li">
          <Box
            as="a"
            x-href="'#' + state.id"
            x="state.textContent"
            x-class="[
              state.textContent === parent.closest.textContent && 'font-bold',
              state.tagName === 'H3' && 'ml-2'
            ]"
          ></Box>
        </Box>
      </Box>
    </Box>
  </Box>
);

export const description = `Sidebar constructs its contents based on h2 and h3 elements while maintaining active state while the page is scrolled.`;
export const displayName = "Sidebar";
export const Example = () => <Sidebar />;

export default Sidebar;
