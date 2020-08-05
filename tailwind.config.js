module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#5c6ac4",
        secondary: "#007ace",
        muted: "#dddddd",
        error: "#de3618",
      },
    },
  },
  variants: {},
  corePlugins: {},
  plugins: [require("@tailwindcss/typography")],
  // Purging is handled as a post-process
  purge: false,
};
