import * as _path from "https://deno.land/std/path/mod.ts";
import {
  parseProperties,
  toSource,
  queryNode,
  queryNodes,
} from "./parse-code.ts";

async function parseProps({
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

    const componentPath = _path.posix.join(
      componentDirectory,
      `${moduleTarget}.tsx`
    );

    return parseProps({
      componentDirectory,
      // @ts-ignore TODO: Type this properly
      displayName: await import(componentPath).displayName,
      path: componentPath,
      source: Deno.readTextFileSync(componentPath),
    });
  }
}

export default parseProps;
