import Heading from "../_primitives/heading";

// TODO: detect heading by name and create it like this
console.log(Heading({ as: "h4" }, "demo header"));

// @ts-ignore: TODO: Add this to global
window.evaluateCode = (code) => {
  // TODO: Evaluate all nodes through patterns/primitives
  const componentNode = new DOMParser().parseFromString(code, "text/html").body;

  return componentNode.innerHTML;
};
