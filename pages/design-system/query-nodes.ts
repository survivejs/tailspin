import { tsquery } from "https://unpkg.com/@phenomnomnominal/tsquery@4.1.1/dist/src/index.js";

function queryNodes(
  { path, source, query }: { path: any; source: any; query: any },
) {
  // @ts-ignore
  const ast = tsquery.ast(source, path, ts.ScriptKind.TSX);

  return tsquery(ast, query, { visitAllChildren: true });
}

export default queryNodes;
