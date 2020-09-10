import * as elements from "./elements.ts";
import Box from "../ds/primitives/box.tsx";

/*
import css from "https://dev.jspm.io/@stitches/css@9.0.0-alpha.8";

console.log(typeof window, window);

const c = css.createCss({ prefix: "", tokens: {}, breakpoints: {}, utils: {} });

const button = c({
  color: "gray",
  "&:hover": {
    color: "black",
  },
  borderColor: "black",
  padding: "1rem",
});

console.log("css", c);
*/

export const page = () => (
  <html>
    <head>
      <script>
        {`
const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('message', function (event) {
  if (event.data === 'refresh') {
    location.reload();
  }
});`}
      </script>
    </head>
    <body>
      <Box m="2" p="2" color="white" bg="primary">
        hello world
      </Box>
    </body>
  </html>
);
