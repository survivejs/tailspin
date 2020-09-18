import { Pages, Urls } from "../types.ts";

async function getPages(urls: Urls) {
  const pages: Pages = {};

  await Promise.all(
    Object.entries(urls).map(async ([url, pagePath]) => {
      if (!pagePath) {
        // TODO: Add logic to deal with dynamically generated pages
        return Promise.resolve();
      }

      // TODO: Maintain a counter per page instead of using a random number
      pages[url] = await import(`${pagePath}?version=${Math.random()}.tsx`);

      return Promise.resolve();
    }),
  );

  return pages;
}

export default getPages;
