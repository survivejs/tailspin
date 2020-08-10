const components = loadComponents(
  require.context("../../ds", true, /^\.\/.*\.tsx$/)
);

// @ts-ignore: TODO: Add this to global
window.evaluateCode = (code) => {
  const node = new DOMParser().parseFromString(code, "text/xml")
    .firstElementChild;

  return node && evaluateNode(node);
};

function evaluateNode(node: Element) {
  const foundComponent = components[node.nodeName];

  return foundComponent
    ? foundComponent(
        // @ts-ignore: Evaluated runtime
        attributesToObject(node.attributes),
        node.children.length
          ? collectionToArray(node.children).map(evaluateNode)
          : [node.innerHTML]
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

function loadComponents(context) {
  const ret = {};

  context.keys().forEach((key) => {
    const { displayName, default: def } = context(key);

    ret[displayName] = def;

    Object.keys(def).forEach((k) => {
      ret[`${displayName}.${k}`] = def[k];
    });
  });

  return ret;
}
