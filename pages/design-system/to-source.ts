import {
  parse,
  print,
} from "https://x.nest.land/swc@0.0.5/mod.ts";

function toSource(
  { source, node }: { source: string; node: any },
) {
  // TODO: Get source for the node using queryNodes
  return print(
    {
      // @ts-ignore
      program: parse(source).value,
      options: {
        minify: false,
        isModule: true,
      },
    },
  ).code;
}

export default toSource;
