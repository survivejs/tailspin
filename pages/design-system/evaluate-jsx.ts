import { Parser } from "acorn";
import jsx from "acorn-jsx";
import { generate } from "escodegen";

const JsxParser = Parser.extend(jsx());

type Components = { [key: string]: (any, children: string[]) => string };

function evaluateJSX(code: string, components: Components) {
  return (
    evaluateJSXElement(
      findFirst(
        "JSXElement",
        // @ts-ignore: body property is missing from the root
        JsxParser.parse(code, { ecmaVersion: 2015 })?.body
      ),
      components
    ) || code
  );
}

function evaluateJSXElement(JSXElement: acorn.Node, components: Components) {
  // @ts-ignore
  const firstJSXOpeningElement = JSXElement?.openingElement;
  const firstJSXElementAttributes = firstJSXOpeningElement?.attributes;
  const firstJSXElementName = resolveJSXElementName(firstJSXOpeningElement);

  if (firstJSXElementName) {
    const foundComponent = components[firstJSXElementName.name];

    if (foundComponent) {
      // @ts-ignore
      return (firstJSXElementName.property
        ? // @ts-ignore
          foundComponent[firstJSXElementName.property]
        : foundComponent)(
        attributesToObject(firstJSXElementAttributes, components),
        // @ts-ignore
        childrenToString(JSXElement.children, components)
      );
    }
  }
}

function resolveJSXElementName(JSXElement: acorn.Node) {
  // @ts-ignore
  const name = JSXElement?.name;

  if (!name) {
    return;
  }

  return name.name
    ? { name: name.name }
    : {
        name: name.object.name,
        property: name.property.name,
      };
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

function attributesToObject(attributes: acorn.Node[], components: Components) {
  const ret = {};

  attributes.forEach((attribute) => {
    // @ts-ignore
    if (attribute?.value?.expression) {
      // @ts-ignore
      const expression = attribute.value.expression;

      if (expression.type === "JSXElement") {
        // @ts-ignore
        ret[attribute?.name?.name] = evaluateJSXElement(expression, components);

        return;
      }

      if (expression.type === "ObjectExpression") {
        // @ts-ignore
        ret[attribute?.name?.name] = objectExpressionToObject(expression);

        return;
      }

      // @ts-ignore
      ret[attribute?.name?.name] = eval(generate(expression));
      // @ts.ignore
    } else {
      // @ts-ignore
      ret[attribute?.name?.name] = attribute?.value?.value;
    }
  });

  return ret;
}

function objectExpressionToObject(node: acorn.Node) {
  const ret = {};

  // @ts-ignore
  node.properties?.forEach((property) => {
    ret[property.key.name] = valueToObject(property.value);
  });

  return ret;
}

function valueToObject(node: acorn.Node) {
  if (node.type === "ArrayExpression") {
    // @ts-ignore
    return node.elements.map(valueToObject);
  }

  if (node.type === "ObjectExpression") {
    return objectExpressionToObject(node);
  }

  if (node.type === "Literal") {
    // @ts-ignore
    return node.value;
  }

  throw new Error(
    `valueToObject - Node type ${node.type} has not been implemented yet`
  );
}

function childrenToString(children: acorn.Node[], components: Components) {
  return children.map((child) => {
    if (child.type === "JSXElement") {
      return evaluateJSXElement(child, components);
    }

    // @ts-ignore
    if (child.expression) {
      // @ts-ignore
      return eval(generate(child.expression));
    }

    // @ts-ignore
    return child.value;
  });
}

export default evaluateJSX;
