import { Parser } from "acorn";
import jsx from "acorn-jsx";

const JsxParser = Parser.extend(jsx());

function evaluateJSX(
  code: string,
  components: { [key: string]: (any, children: string[]) => string }
) {
  // @ts-ignore: body property is missing from the root
  const firstJSXElement = findFirst("JSXElement", JsxParser.parse(code)?.body);
  const firstJSXElementName = firstJSXElement?.openingElement?.name?.name;

  if (firstJSXElementName) {
    const foundComponent = components[firstJSXElementName];

    if (foundComponent) {
      // TODO: Iterate on this
      return foundComponent({}, ["test"]);
    }
  }

  // TODO: Map parsed code to components
  return code;
}

function findFirst(type: string, nodes: acorn.Node[]) {
  for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
    const node = nodes[nodeIndex];

    if (node.type === type) {
      return node;
    }

    // @ts-ignore
    if (node?.expression?.type === type) {
      // @ts-ignore
      return node.expression;
    }
  }
}

export default evaluateJSX;
