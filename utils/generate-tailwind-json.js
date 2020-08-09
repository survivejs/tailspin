#!/usr/bin/env node
// https://github.com/impulse/tailwind.json/blob/main/index.js

const fs = require("fs");
const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require(process.cwd() + "/tailwind.config.js");

try {
  const fullConfig = resolveConfig(tailwindConfig);
  const expandedConfig = {
    ...fullConfig,
    expandedColors: expandColors(fullConfig.theme.colors),
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

function isObject(a) {
  return typeof a === "object";
}
