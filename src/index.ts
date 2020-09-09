import { Application } from "https://deno.land/x/oak@v6.1.0/mod.ts";

async function serve(port: number) {
  const app = new Application();

  // @ts-ignore
  const { hello } = await import("./demo.ts");

  // TODO: Generalize and return jsx processed through typed-html
  app.use(async (context) => {
    // ctx.request.url.pathname
    context.response.body = new TextEncoder().encode(hello());
  });

  app.listen({ port });

  console.log(`Serving at http://127.0.0.1:${port}`);
}

// TODO: Make port configurable
const port = 3000;

// Only development mode for now
serve(port);
