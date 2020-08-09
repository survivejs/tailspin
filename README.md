# tailwind-webpack-starter

`tailwind-webpack-starter` has been designed for small sites/apps. It implements the following stack:

- [Tailwind.css](https://tailwindcss.com/) for styling
- [webpack](https://webpack.js.org/) for bundling
- [typed-html](https://www.npmjs.com/package/typed-html) for templating and component model
- [Sidewind](https://sidewindjs.com/) for state management

The starter comes with a Prettier/lint-staged setup so your code stays formatted as you develop. There's no ESLint in place at the moment.

## Structure

- `assets/` - Static assets such as favicons.
- `ds/` - The design system of the project lives here and it contains **layouts**, **patterns**, and **primitives** used to construct the pages.
- `pages/` - The system picks up each `index.tsx` and it follows index-first convention. The idea is that this way you can colocate other related files behind a page directory. Each page can have optional JavaScript attached to it and the system picks up `_page.ts` by convention. Any logic that should be run on each page should go to `pages/_shared.ts`.
