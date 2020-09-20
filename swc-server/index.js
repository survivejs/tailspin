const swc = require('@swc/wasm');
const jayson = require('jayson');

function serve(port) {
  const server = jayson.server({
    parse: (args, cb) => {
      try {
        cb(null, parse(args[0]));
      } catch(err) {
        console.error(err);

        cb(err);
      }
    },
    ping: (_, cb) => cb(null, 'pong'),
    print: (args, cb) => {
      try {
        cb(null, print(args[0]));
      } catch(err) {
        console.error(err);

        cb(err);
      }
    },
  });
 
  console.log(`swc-server - running at port ${port}`)
  server.http().listen(port);
}

function parse(source) {
  return swc.parseSync(source, { syntax: "typescript", tsx: true });
}

function print(ast) {
  const ret = swc.printSync({ type: "Module", body: [{ type: "ExpressionStatement", expression: ast, span: { start: 0, end: 0, ctxt: 0 } }], span: { start: 0, end: 0, ctxt: 0 } }, {}).code.trim();

  // TODO: Trim last ;
  return ret.slice(0, ret.length - 1);
}

serve(process.env.PORT || 4000);
