const swc = require('@swc/wasm');
const Koa = require('koa');

function serve(port) {
  const app = new Koa();
 
  // response
  app.use(context => {
    const { url, query } = context;
    const urlRoot = url.split('?')[0]

    // http://localhost:4000/parse?source=%22const%20a%20=%20%3Cdiv%3Efoo%3C/div%3E%22
    if (urlRoot === '/parse') {
      const { source } = query;

      if (!source) {
        context.status = 404;
      }
      else {
        const parsedSource = JSON.parse(Buffer.from(source, 'base64').toString());

        context.body = parse(parsedSource);
      }
    }
    // http://localhost:4000/parse?ast=%22<AST goes here>%22
    else if (urlRoot === '/print') {
      const { ast } = query;

      if (!source) {
        context.status = 404;
      }
      else {
        context.body = print(ast);
      }
    }
    else {
      context.status = 404
    }
  });
  
  console.log('swc-server - running at port 4000')
  app.listen(port);
}

function parse(str) {
  return swc.parseSync(str, { syntax: "typescript", tsx: true });
}

function print(ast) {
  return swc.printSync(ast, {});
}

serve(process.env.PORT || 4000);
