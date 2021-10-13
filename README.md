> **Deprecated** See [gustwind](https://github.com/survivejs/gustwind) for the project that replaced this one.

# Tailspin - Site generator and design system in one

**Tailspin** is a collection of utilities that implements the following stack:

- [Oceanwind](https://www.npmjs.com/package/oceanwind) for styling. It uses [Tailwind.css](https://tailwindcss.com/) syntax underneath.
- [Deno](https://deno.land/) for bundling
- [typed-html](https://www.npmjs.com/package/typed-html) for templating and component model
- [Sidewind](https://sidewindjs.com/) for state management

## Structure

- `assets/` - Static assets such as favicons.
- `ds/` - The design system of the project lives here and it contains **layouts**, **patterns**, and **primitives** used to construct the pages.
- `pages/` - The system picks up each `index.tsx` from the hierarchy and constructs a page for each. It's possible to load dynamic content to a section of a site by writing a `_pages.ts` file which returns a `getPages` function resolving to page data and `layout` pointing to a layout through which to render each page.

## Usage

Run the available commands through [denon](https://github.com/denosaurs/denon) or [velociraptor](https://github.com/umbopepato/velociraptor) (vr).
