const swc = require('@swc/wasm');
const jayson = require('jayson');

function serve(port) {
  const server = jayson.server({
    parse: (args, cb) => cb(null, parse(args[0])),
    ping: (_, cb) => cb(null, 'pong'),
    print: (args, cb) => cb(null, print(args[0])),
  });
 
  console.log(`swc-server - running at port ${port}`)
  server.http().listen(port);
}

function parse(source) {
  console.log('PARSING', source, swc.parseSync(source, { syntax: "typescript", tsx: true }))

  return swc.parseSync(source, { syntax: "typescript", tsx: true });
}

function print(ast) {
  consoel.log('PRINTING', ast)

  return swc.printSync(ast, {});
}

serve(process.env.PORT || 4000);
