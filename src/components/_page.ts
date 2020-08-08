import Box from "../_primitives/box";
import Flex from "../_primitives/flex";
import Button from "../_primitives/button";
import Heading from "../_primitives/heading";
import Link from "../_primitives/link";
import Alert from "../_patterns/alert";
import Navigation from "../_patterns/navigation";

// TODO: Figure out a nice way to maintain this list.
const components = {
  Box,
  Flex,
  Button,
  Heading,
  Link,
  Alert,
  Navigation,
  "Navigation.Item": Navigation.Item,
};

// @ts-ignore: TODO: Add this to global
window.evaluateCode = (code) => {
  const node = new DOMParser().parseFromString(code, "text/xml")
    .firstElementChild;

  return node && evaluateNode(node);
};

function evaluateNode(node: Element) {
  const foundComponent = components[node.nodeName];

  if (node.nodeName === "Box") {
    console.log("box children", node.children);
  }

  return foundComponent
    ? foundComponent(
        // @ts-ignore: Evaluated runtime
        attributesToObject(node.attributes),
        node.children.length
          ? collectionToArray(node.children).map(evaluateNode)
          : node.innerHTML
      )
    : node.innerHTML;
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
