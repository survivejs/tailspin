# tailwind-webpack-starter

`tailwind-webpack-starter` has been designed for small sites/apps. It implementes the following stack:

- [Tailwind.css](https://tailwindcss.com/) for styling
- [webpack](https://webpack.js.org/) for bundling
- [typed-html](https://www.npmjs.com/package/typed-html) for templating and component model
- [Sidewind](https://sidewindjs.com/) for state management

The starter comes with a Prettier/lint-staged setup so your code stays formatted as you develop. There's no ESLint in place at the moment.

## Structure

- `components/` - Component templates should go here. These are the building blocks (buttons etc.).
- `layouts/` - Same but for layouts. They represent the other end (`html`, `head`, `body`) and should be consumed by individual pages.
- `pages/` - Each page gets rendered behind a matching HTML page with `index.html` suffixed to it in order to maintain clean urls.
