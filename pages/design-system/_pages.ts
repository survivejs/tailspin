import { expandGlobSync, joinPath } from "../../deps.ts";
import type { DesignSystemComponent } from "../../types.ts";
import ComponentPageLayout from "../../ds/layouts/ComponentPage.tsx";

async function getPages() {
  const ret: { component: DesignSystemComponent; url: string }[] = [];

  for (
    const file of expandGlobSync(
      joinPath(Deno.cwd(), "ds/**/*.tsx"),
    )
  ) {
    const component = await import(file.path);

    ret.push({ component, url: component.displayName });
  }

  return ret;
}

export {
  getPages,
  ComponentPageLayout as layout,
};
