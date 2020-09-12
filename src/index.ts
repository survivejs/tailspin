import { Application } from "https://deno.land/x/oak@v6.1.0/mod.ts";
import {
  WebSocket,
  WebSocketServer,
} from "https://deno.land/x/websocket@v0.0.3/mod.ts";
import {
  setup,
  getStyleTag,
  VirtualInjector,
} from "https://unpkg.com/@bebraw/oceanwind@0.2.5";

type Pages = {
  [key: string]: {
    default: ({
      url,
      title,
      meta,
    }: {
      url: string;
      title?: string;
      meta?: { [key: string]: string };
    }) => void;
  };
};

const websocketClient = `const socket = new WebSocket('ws://localhost:8080');
  
socket.addEventListener('message', (event) => {
  if (event.data === 'connected') {
    console.log('WebSocket - connected');
  }

  if (event.data === 'refresh') {
    location.reload();
  }
});`
  .split("\n")
  .join("");

async function serve(port: number) {
  const app = new Application();
  const pages: Pages = {};

  pages.index = await import("../pages/index.tsx");

  const wss = new WebSocketServer(8080);
  wss.on("connection", (ws: WebSocket) => {
    console.log("wss - Connected");

    ws.send("connected");

    // Catch possible messages here
    /*ws.on("message", (message: string) => {
      console.log(message);
      ws.send(message);
    });*/
  });

  // TODO: generalize
  app.use(async (context) => {
    console.log("page", pages);

    const injector = VirtualInjector();
    setup({ injector });

    try {
      const pageHtml = pages.index.default({ url: "/" });

      const styleTag = getStyleTag(injector);

      context.response.headers.set("Content-Type", "text/html; charset=UTF-8");
      context.response.body = new TextEncoder().encode(`<html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Deno demo</title>
      <meta name="description" content="description goes here"></meta>
      <script>${websocketClient}</script>
      <script type="text/javascript" src="https://unpkg.com/sidewind@3.1.2/dist/sidewind.umd.production.min.js"></script>
      <link rel="stylesheet" href="https://unpkg.com/tailwindcss@1.8.3/dist/base.min.css" />
      <link rel="stylesheet" href="https://unpkg.com/@tailwindcss/typography@0.2.0/dist/typography.min.css" />
      ${styleTag}
    </head>
    <body>
      ${pageHtml}
    </body>
  </html>`);
    } catch (err) {
      console.error(err);

      context.response.body = new TextEncoder().encode(err.stack);
    }
  });

  console.log(`Serving at http://127.0.0.1:${port}`);
  app.listen({ port });

  watchDirectories(
    // Directories have to be relative to cwd
    // https://github.com/denoland/deno/issues/5742
    ["./ds", "./pages"],
    pages,
    wss
  );
}

async function watchDirectories(
  directories: string[],
  pages: Pages,
  wss: WebSocketServer
) {
  const watcher = Deno.watchFs(directories, { recursive: true });

  for await (const event of watcher) {
    console.log("watchDirectories - Detected a change", event, wss.clients);

    if (event.kind === "modify") {
      // TODO: generalize
      // @ts-ignore
      pages.index = await import(
        `../pages/index.tsx?version=${Math.random()}.tsx`
      );

      wss.clients.forEach((socket) => {
        // 1 for open, https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
        if (socket.state === 1) {
          console.log("watchDirectories - Refresh ws");

          socket.send("refresh");
        }
      });
    }
  }
}

// TODO: Make port configurable
const port = 3000;

// Only development mode for now
serve(port);
