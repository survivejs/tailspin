import _fs from "fs";
import _path from "path";
import { parseProperties, toSource, queryNode, queryNodes } from "./parse-code";

function parseProps({
  componentDirectory,
  displayName,
  path,
  source,
}: {
  componentDirectory: string;
  displayName: string;
  path: string;
  source: string;
}) {
  // This isn't fool proof. It would be better to find specifically a function
  // to avoid matching something else.
  const componentNode = queryNode({
    source,
    query: `Identifier[name="${displayName}"]`,
    path,
  });

  if (!componentNode) {
    return;
  }

  const componentSource = toSource({
    source,
    node: componentNode.parent,
    path,
  });
  const propNodes = queryNodes({
    source: componentSource,
    query: "TypeLiteral PropertySignature",
    path,
  });

  if (propNodes.length) {
    return parseProperties(propNodes);
  }

  // TODO: Likely it would be better to select the first parameter instead
  const typeReferenceNode = queryNode({
    source: componentSource,
    query: `Identifier[name="props"] ~ TypeReference`,
    path,
  });

  if (typeReferenceNode) {
    const referenceType = typeReferenceNode.getText();
    const propertySignatureNodes = queryNodes({
      source: source,
      query: `Identifier[name="${referenceType}"] ~ TypeLiteral > PropertySignature`,
      path,
    });

    if (propertySignatureNodes.length) {
      return parseProperties(propertySignatureNodes);
    }

    const identifierNode = queryNode({
      source,
      query: `Identifier[name="${referenceType}"]`,
      path,
    });

    if (!identifierNode) {
      return;
    }

    // TODO: Tidy up
    // @ts-ignore
    const moduleTarget = identifierNode?.parent?.parent?.parent?.parent?.moduleSpecifier
      ?.getText()
      .replace(/"/g, "");

    // TODO: Figure out why this can occur for Stack
    if (!moduleTarget) {
      // console.warn(`parseProps - Missing module target`, identifierNode);
      return "";
    }

    const componentPath = _path.join(componentDirectory, `${moduleTarget}.tsx`);

    return parseProps({
      componentDirectory,
      displayName: require(componentPath).displayName,
      path: componentPath,
      source: _fs.readFileSync(componentPath, { encoding: "utf-8" }),
    });
  }
}

export default parseProps;
