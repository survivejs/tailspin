module.exports = {
  theme: {},
  variants: {},
  corePlugins: {},
  plugins: [require("@tailwindcss/typography")],
  purge: {
    mode: "all",
    content: ["./src/**/*.ts", "./src/**/*.tsx"],
  },
};
