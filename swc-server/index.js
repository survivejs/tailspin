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
  console.log('PARSING', source, swc.parseSync(source, { syntax: "typescript", tsx: true }))

  return swc.parseSync(source, { syntax: "typescript", tsx: true });
}

function print(ast) {
  console.log('PRINTING', ast);

  return swc.printSync(ast, { syntax: "typescript", tsx: true });
}

serve(process.env.PORT || 4000);
