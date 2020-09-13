import { Pages, Urls } from "../types.ts";

async function getPages(urls: Urls) {
  const pages: Pages = {};

  await Promise.all(
    Object.entries(urls).map(async ([url, pagePath]) => {
      // TODO: Maintain a counter per page instead of using a random number
      pages[url] = await import(`${pagePath}?version=${Math.random()}.tsx`);

      return Promise.resolve();
    }),
  );

  return pages;
}

export default getPages;
