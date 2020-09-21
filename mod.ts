import { getStyleInjector, getStyleTag, Application } from "./deps.ts";
import getUrls from "./utils/get-urls.ts";
import getPages from "./utils/get-pages.ts";
import watchDirectories from "./src/watch-directories.ts";
import type { Pages, Page } from "./types.ts";
import { getWebsocketServer, websocketClient } from "./src/web-sockets.ts";

async function serve(port: number) {
  const app = new Application();
  const pageContext: {
    _pages: Pages;
    init: () => void;
    getPage: (url: string) => Page;
  } = {
    _pages: {},
    init: async function () {
      this._pages = await getPages(await getUrls());
    },
    getPage: function (url: string) {
      return this._pages[url];
    },
  };
  await pageContext.init();

  const wss = getWebsocketServer();

  app.use(async (context) => {
    const url = context.request.url.pathname;
    const page = pageContext.getPage(url);

    if (!page) {
      // favicon and others fall here
      context.response.status = 404;

      return;
    }

    try {
      const injector = getStyleInjector();

      const { module: { default: component }, pages, attributes } = page;

      const pageHtml = await Promise.resolve(
        component({ url, pages, attributes }),
      );

      // @ts-ignore: TODO: Drop default in favor of simpler composition?
      const { title, meta } = component;

      const styleTag = getStyleTag(injector);

      context.response.headers.set("Content-Type", "text/html; charset=UTF-8");
      context.response.body = new TextEncoder().encode(`<html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title || ""}</title>
      ${generateMeta(meta)}
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

  // TODO: Drop this as denon handles file watching - all we need to do
  // is to make the client reconnect and the force a refresh on reconnection
  watchDirectories(
    // Directories have to be relative to cwd
    // https://github.com/denoland/deno/issues/5742
    ["./ds", "./pages"],
    async () => {
      await pageContext.init();

      wss.clients.forEach((socket) => {
        // 1 for open, https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
        if (socket.state === 1) {
          console.log("watchDirectories - Refresh ws");

          socket.send("refresh");
        }
      });
    },
  );
}

function generateMeta(meta?: { [key: string]: string }) {
  if (!meta) {
    return "";
  }

  return Object.entries(meta).map(([key, value]) =>
    `<meta name="${key}" content="${value}"></meta>`
  ).join("\n");
}

// TODO: Make port configurable
const port = 3000;

// Only development mode for now
serve(port);
