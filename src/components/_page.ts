import Heading from "../_primitives/heading";

// @ts-ignore: TODO: Add this to global
window.evaluateCode = (code) => {
  // TODO: Evaluate all nodes through patterns/primitives
  const componentNode = new DOMParser().parseFromString(code, "text/html").body
    .firstElementChild;

  if (!componentNode) {
    return "";
  }

  if (componentNode.nodeName === "HEADING") {
    return Heading(
      // @ts-ignore: Evaluated runtime
      attributesToObject(componentNode.attributes),
      componentNode.innerHTML
    );
  }

  return componentNode.innerHTML;
};

function attributesToObject(attributes: NamedNodeMap) {
  const ret = {};

  for (let i = 0; i < attributes.length; i++) {
    ret[attributes[i].nodeName] = attributes[i].nodeValue;
  }

  return ret;
}
