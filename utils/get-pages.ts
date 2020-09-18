import { Pages, Urls } from "../types.ts";

async function getPages(urls: Urls) {
  const ret: Pages = {};

  await Promise.all(
    Object.entries(urls).map(async ([url, { path, pages }]) => {
      if (!path) {
        // TODO: Add logic to deal with dynamically generated pages
        return Promise.resolve();
      }

      // TODO: Maintain a counter per page instead of using a random number
      const module = await import(`${path}?version=${Math.random()}.tsx`);

      ret[url] = { module, pages };

      return Promise.resolve();
    }),
  );

  return ret;
}

export default getPages;
