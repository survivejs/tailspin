import { Application } from "https://deno.land/x/oak@v6.1.0/mod.ts";
import {
  WebSocket,
  WebSocketServer,
} from "https://deno.land/x/websocket@v0.0.3/mod.ts";
import {
  setup,
  filterOutUnusedRules,
  getStyleTag,
  VirtualInjector,
} from "https://unpkg.com/@bebraw/oceanwind@0.2.4";

async function serve(port: number) {
  const app = new Application();
  // TODO: Add a better type
  const pages: { [key: string]: any } = {};

  pages.hello = await import("./demo.tsx");

  let websocket: WebSocket;
  const wss = new WebSocketServer(8080);
  wss.on("connection", (ws: WebSocket) => {
    websocket = ws;

    /*ws.on("message", (message: string) => {
      console.log(message);
      ws.send(message);
    });*/
  });

  // TODO: Generalize and return jsx processed through typed-html
  app.use(async (context) => {
    console.log("page", pages);

    const injector = VirtualInjector();
    setup({ injector });

    const pageHtml = pages.hello.page();
    const styleTag = getStyleTag(filterOutUnusedRules(injector, pageHtml));

    console.log("style tag", styleTag);

    // TODO: Either make sidewind self-register or register it explicitly in a module.
    context.response.headers.set("Content-Type", "text/html; charset=UTF-8");
    context.response.body = new TextEncoder().encode(`<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Deno demo</title>
    <meta name="description" content="description goes here"></meta>
    <script>
    const socket = new WebSocket('ws://localhost:8080');

    socket.addEventListener('message', function (event) {
      if (event.data === 'refresh') {
        location.reload();
      }
    });
    </script>
    <script type="text/javascript" src="https://unpkg.com/sidewind@3.1.2/dist/sidewind.umd.production.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/tailwindcss@1.8.3/dist/base.min.css" />
    <link rel="stylesheet" href="https://unpkg.com/@tailwindcss/typography@0.2.0/dist/typography.min.css" />
    ${styleTag}
  </head>
  <body>
    ${pageHtml}
  </body>
</html>`);
  });

  console.log(`Serving at http://127.0.0.1:${port}`);
  app.listen({ port });

  // TODO: Extract to a separate function
  const watcher = Deno.watchFs(["./"]);
  for await (const event of watcher) {
    if (event.kind === "modify") {
      // TODO: check paths + generalize

      // https://stackoverflow.com/questions/61903993/how-to-delete-runtime-import-cache-in-deno
      // @ts-ignore
      pages.hello = await import(`./demo.tsx?version=${Math.random()}.tsx`);

      // @ts-ignore
      websocket?.send("refresh");
    }
  }
}

// TODO: Make port configurable
const port = 3000;

// Only development mode for now
serve(port);
