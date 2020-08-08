// @ts-ignore: TODO: Add this to global
window.evaluateCode = (code) => {
  // TODO: Evaluate all nodes through patterns/primitives
  const componentNode = new DOMParser().parseFromString(code, "text/html").body;

  return componentNode.innerHTML;
};
