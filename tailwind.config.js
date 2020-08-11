module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#09b5c4",
        secondary: "#434343",
        action: "#6eedf8",
        muted: "#999",
        error: "#ec5334",
        warning: "#fdf2bb",
        tip: "#f5fffb",
      },
    },
  },
  variants: {},
  corePlugins: {},
  plugins: [require("@tailwindcss/typography")],
  // Purging is handled as a post-process
  purge: false,
};
