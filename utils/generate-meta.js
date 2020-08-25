#!/usr/bin/env node
// https://github.com/impulse/tailwind.json/blob/main/index.js

const fs = require("fs");
const path = require("path");
const glob = require("glob");
const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require(process.cwd() + "/tailwind.config.js");

const isObject = (a) => typeof a === "object";

try {
  const fullConfig = resolveConfig(tailwindConfig);
  const expandedConfig = {
    ...fullConfig,
    expandedColors: expandColors(fullConfig.theme.colors),
    internalLinks: getInternalLinks(),
  };

  fs.writeFileSync(
    process.cwd() + "/tailwind.json",
    JSON.stringify(expandedConfig, null, 2),
    {
      encoding: "utf-8",
    }
  );
} catch (error) {
  console.error(error);
}

function getInternalLinks() {
  // TODO: Share path and glob with webpack config?
  const pagesRoot = path.join(__dirname, "..", "pages");
  const pagesGlob = path.join(pagesRoot, "**", "index.tsx");
  const internalLinks = glob
    .sync(pagesGlob)
    .map((p) => path.relative(pagesRoot, p))
    .map((p) => p.replace("/index.tsx", "").replace("index.tsx", "/"))
    .map((p) => (p === "/" ? p : `/${p}/`));
  const ret = {};

  internalLinks.forEach((link) => {
    ret[link] = link;
  });

  return ret;
}

function expandColors(colors) {
  const ret = {};

  // This assumes one level of nesting so no recursion is needed
  Object.entries(colors).forEach(([key, value]) => {
    if (isObject(value)) {
      Object.entries(value).forEach(([k, v]) => {
        ret[`${key}-${k}`] = v;
      });
    } else {
      ret[key] = value;
    }
  });

  return ret;
}
