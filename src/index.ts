import { Application } from "https://deno.land/x/oak@v6.1.0/mod.ts";

async function serve(port: number) {
  const app = new Application();
  // TODO: Add a better type
  const pages: { [key: string]: any } = {};

  pages.hello = await import("./demo.tsx");

  // TODO: Generalize and return jsx processed through typed-html
  app.use(async (context) => {
    console.log("page", pages);

    // ctx.request.url.pathname
    context.response.body = new TextEncoder().encode(pages.hello.page());
  });

  app.listen({ port });

  const watcher = Deno.watchFs(["./"]);
  for await (const event of watcher) {
    if (event.kind === "modify") {
      // TODO: check paths + generalize

      // https://stackoverflow.com/questions/61903993/how-to-delete-runtime-import-cache-in-deno
      // @ts-ignore
      pages.hello = await import(`./demo.tsx?version=${Math.random()}.tsx`);
    }
  }

  console.log(`Serving at http://127.0.0.1:${port}`);
}

// TODO: Make port configurable
const port = 3000;

// Only development mode for now
serve(port);
