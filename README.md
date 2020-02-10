# tailwind-webpack-starter

`tailwind-webpack-starter` has been designed for small sites/apps. It implements the following stack:

- [Tailwind.css](https://tailwindcss.com/) for styling
- [webpack](https://webpack.js.org/) for bundling
- [typed-html](https://www.npmjs.com/package/typed-html) for templating and component model
- [Sidewind](https://sidewindjs.com/) for state management

The starter comes with a Prettier/lint-staged setup so your code stays formatted as you develop. There's no ESLint in place at the moment.

## Structure

- `assets/` - Static assets such as favicons.
- `src/` - The system picks up each `index.tsx` and it follows index-first convention. The idea is that this way you can colocate other related files behind a page directory.
- `src/_components` - Component templates of the system. These are the building blocks that are used for composing pages.
- `src/_layouts` - Base layouts of the system. Each page starts from one and these glue scripts and style tags coming from webpack to the page.
