import {
  parse,
  print,
} from "https://x.nest.land/swc@0.0.5/mod.ts";

function toSource(
  { source, node }: { source: string; node: any },
) {
  // TODO: Get source for the node
  return print(
    {
      program: parse(source),
      options: {
        minify: false,
        isModule: true,
      },
    },
  ).code;
}

export default toSource;
