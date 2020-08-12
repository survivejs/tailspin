import { Parser } from "acorn";
import jsx from "acorn-jsx";

const JsxParser = Parser.extend(jsx());

function evaluateJSX(
  code: string,
  components: { [key: string]: (any, children: string[]) => string }
) {
  // @ts-ignore: body property is missing from the root
  const firstJSXElement = findFirst("JSXElement", JsxParser.parse(code)?.body);
  const firstJSXOpeningElement = firstJSXElement?.openingElement;
  const firstJSXElementAttributes = firstJSXOpeningElement?.attributes;
  const firstJSXElementName = firstJSXOpeningElement?.name?.name;

  if (firstJSXElementName) {
    const foundComponent = components[firstJSXElementName];

    if (foundComponent) {
      return foundComponent(attributesToObject(firstJSXElementAttributes), [
        "test",
      ]);
    }
  }

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

function attributesToObject(attributes: acorn.Node[]) {
  const ret = {};

  attributes.forEach((attribute) => {
    // @ts-ignore
    ret[attribute?.name?.name] = attribute?.value?.value;
  });

  return ret;
}

export default evaluateJSX;
