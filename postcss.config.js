module.exports =
  process.env.NODE_ENV === "purge"
    ? {
        plugins: [
          // https://tailwindcss.com/docs/controlling-file-size/#setting-up-purgecss-manually
          require("@fullhuman/postcss-purgecss")({
            content: ["./public/**/*.html"],

            // This is the function used to extract class names from your templates
            defaultExtractor: (content) => {
              // Capture as liberally as possible, including things like `h-(screen-1.5)`
              const broadMatches =
                content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];

              // Capture classes within other delimiters like .block(class="w-1/2") in Pug
              const innerMatches =
                content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];

              return broadMatches.concat(innerMatches);
            },
            whitelistPatterns: [
              /^hljs/,
              /^p-/,
              /^pr-/,
              /^pl-/,
              /^pt-/,
              /^pb-/,
              /^px-/,
              /^py-/,
              /^m-/,
              /^mr-/,
              /^ml-/,
              /^mt-/,
              /^mb-/,
              /^mx-/,
              /^my-/,
            ],
          }),
          require("postcss-clean"),
        ],
      }
    : {
        plugins: {
          tailwindcss: "tailwind.config.js",
          autoprefixer: {},
        },
      };
