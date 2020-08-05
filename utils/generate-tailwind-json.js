#!/usr/bin/env node
// https://github.com/impulse/tailwind.json/blob/main/index.js

const fs = require("fs");
const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require(process.cwd() + "/tailwind.config.js");

try {
  let fullConfig = resolveConfig(tailwindConfig);
  fullConfig = JSON.stringify(fullConfig, null, 2);

  fs.writeFileSync(process.cwd() + "/tailwind.json", fullConfig, {
    encoding: "utf-8",
  });
} catch (error) {
  console.error(error);
}
