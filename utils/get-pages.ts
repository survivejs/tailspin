import type { Pages, Urls } from "../types.ts";

async function getPages(urls: Urls) {
  const ret: Pages = {};

  await Promise.all(
    Object.entries(urls).map(
      async ([url, { path, pages, attributes, layout }]) => {
        if (path) {
          // TODO: It's better to do
          // await import(`${path}.tsx#${Math.random()}`)
          // TODO: Maintain a counter per page instead of using a random number
          const module = await import(`${path}?version=${Math.random()}.tsx`);

          ret[url] = { module, pages, attributes };

          return Promise.resolve();
        }

        if (!layout) {
          console.warn(
            "Dynamic page is missing a layout",
            { url, path, pages, attributes },
          );

          return Promise.resolve();
        }

        // TODO: Consider reloading the layout now given it might have received
        // changes. Likely this should be await import(<layout path>)
        ret[url] = {
          module: {
            "default": layout,
          },
          pages,
          attributes,
        };

        // TODO: Add logic to deal with dynamically generated pages
        return Promise.resolve();
      },
    ),
  );

  return ret;
}

export default getPages;
