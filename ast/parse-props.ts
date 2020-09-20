import { printAst } from "../deps.ts";
import queryNodes from "./query-nodes.ts";

async function parseProps({
  componentPath,
  displayName,
  source,
}: {
  componentPath: string;
  displayName: string;
  source: string;
}): Promise<{ name: string; isOptional: boolean; type: string }[] | undefined> {
  // TODO
  return Promise.resolve([{ name: "demo", isOptional: false, type: "demo" }]);

  /*
  // This isn't fool proof. It would be better to find specifically a function
  // to avoid matching something else.
  const componentNodes = await queryNodes({
    source,
    // TODO
    // query: `Identifier[name="${displayName}"]`,
    query: { type: displayName },
  });
  const componentNode = componentNodes[0];

  if (!componentNode) {
    return;
  }

  // @ts-ignore: TODO: Add parents to AST nodes
  const componentSource = await printAst(componentNode.parent);
  const propNodes = await queryNodes({
    source: componentSource,
    // query: "TypeLiteral PropertySignature",
    // TODO
    query: {},
  });

  if (propNodes.length) {
    // @ts-ignore TODO: Fix the type
    return parseProperties(propNodes);
  }

  // TODO: Likely it would be better to select the first parameter instead
  const typeReferenceNodes = await queryNodes({
    source: componentSource,
    // query: `Identifier[name="props"] ~ TypeReference`,
    // TODO
    query: {},
  });
  const typeReferenceNode = typeReferenceNodes[0];

  if (typeReferenceNode) {
    // @ts-ignore
    const referenceType = typeReferenceNode.getText();
    const propertySignatureNodes = await queryNodes({
      source: source,
      /*query:
        `Identifier[name="${referenceType}"] ~ TypeLiteral > PropertySignature`,
      // TODO
      query: {},
    });

    if (propertySignatureNodes.length) {
      // @ts-ignore TODO: Fix the type
      return parseProperties(propertySignatureNodes);
    }

    const identifierNodes = await queryNodes({
      source,
      // query: `Identifier[name="${referenceType}"]`,
      // TODO
      query: {},
    });
    const identifierNode = identifierNodes[0];

    if (!identifierNode) {
      return;
    }

    // TODO: Tidy up
    // @ts-ignore
    const moduleTarget = identifierNode?.parent?.parent?.parent?.parent
      ?.moduleSpecifier
      ?.getText()
      .replace(/"/g, "");

    // TODO: Figure out why this can occur for Stack
    if (!moduleTarget) {
      // console.warn(`parseProps - Missing module target`, identifierNode);
      return;
    }

    // TODO
    return Promise.resolve(undefined);

    return parseProps({
      componentDirectory,
      // @ts-ignore TODO: Type this properly
      displayName: await import(componentPath).displayName,
      source: Deno.readTextFileSync(componentPath),
    });
  }
  */
}

// @ts-ignore
function parseProperties(nodes) {
  if (!nodes.length) {
    return;
  }

  return nodes.map(
    // @ts-ignore: Figure out the exact type
    ({ name: nameNode, questionToken, type: typeNode }) => {
      const name = nameNode.getText();
      const isOptional = !!questionToken;
      const type = typeNode.getText();

      return { name, isOptional, type };
    },
  );
}

export default parseProps;
