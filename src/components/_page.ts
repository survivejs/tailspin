import Box from "../_primitives/box";
import Button from "../_primitives/button";
import Heading from "../_primitives/heading";
import Link from "../_primitives/link";
import Alert from "../_patterns/alert";

// @ts-ignore: TODO: Add this to global
window.evaluateCode = (code) => {
  const node = new DOMParser().parseFromString(code, "text/xml")
    .firstElementChild;

  return node && evaluateNode(node);
};

function evaluateNode(node: Element) {
  if (node.nodeName === "Box") {
    return Box(
      // @ts-ignore: Evaluated runtime
      attributesToObject(node.attributes),
      node.children.length
        ? collectionToArray(node.children).map(evaluateNode)
        : node.innerHTML
    );
  }

  if (node.nodeName === "Heading") {
    return Heading(
      // @ts-ignore: Evaluated runtime
      attributesToObject(node.attributes),
      node.innerHTML
    );
  }

  if (node.nodeName === "Button") {
    return Button(
      // @ts-ignore: Evaluated runtime
      attributesToObject(node.attributes),
      node.innerHTML
    );
  }

  if (node.nodeName === "Link") {
    return Link(
      // @ts-ignore: Evaluated runtime
      attributesToObject(node.attributes),
      node.innerHTML
    );
  }

  if (node.nodeName === "Alert") {
    return Alert(
      // @ts-ignore: Evaluated runtime
      attributesToObject(node.attributes),
      node.innerHTML
    );
  }

  return node.innerHTML;
}

function collectionToArray(collection: HTMLCollection) {
  // https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
  return Array.prototype.slice.call(collection);
}

function attributesToObject(attributes: NamedNodeMap) {
  const ret = {};

  for (let i = 0; i < attributes.length; i++) {
    ret[attributes[i].nodeName] = attributes[i].nodeValue;
  }

  return ret;
}
