import path from "path";
import webpack from "webpack";
import WebpackWatchedGlobEntries from "webpack-watched-glob-entries-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import MiniHtmlWebpackPlugin from "mini-html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import PurgeCSSPlugin from "purgecss-webpack-plugin";
import TerserJSPlugin from "terser-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import { AddDependencyPlugin } from "webpack-add-dependency-plugin";
import merge from "webpack-merge";
import glob from "glob";

const PORT = 8080;
const ROOT = __dirname;
const PATHS = {
  ASSETS: path.resolve(ROOT, "assets"),
  COMPONENTS: path.resolve(ROOT, "components"),
  JS: path.resolve(ROOT, "js"),
  LAYOUTS: path.resolve(ROOT, "layouts"),
  PAGES: path.resolve(ROOT, "pages"),
  OUTPUT: path.resolve(ROOT, "public"),
};
const ALL_COMPONENTS = glob.sync(path.join(PATHS.COMPONENTS, "*.tsx"));
const ALL_LAYOUTS = glob.sync(path.join(PATHS.LAYOUTS, "*.tsx"));
const ALL_PAGES = glob.sync(path.join(PATHS.PAGES, "*.tsx"));

const commonConfig: webpack.Configuration = merge(
  {
    entry: WebpackWatchedGlobEntries.getEntries([
      path.resolve(PATHS.JS, "**/*.js"),
    ]),
    output: {
      path: PATHS.OUTPUT,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: PATHS.PAGES,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.ts(x)$/,
          include: [PATHS.LAYOUTS, PATHS.PAGES],
          use: {
            loader: "ts-loader",
          },
        },
        {
          test: /\.(p)css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        },
      ],
    },
    plugins: [
      new WebpackWatchedGlobEntries(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new CopyPlugin([{ from: PATHS.ASSETS, to: "assets" }]),
    ],
  },
  generatePages(ALL_PAGES),
  generateDependencies(ALL_PAGES)
);

function generatePages(paths) {
  return {
    plugins: paths.map(generatePage),
  };
}

const { generateCSSReferences, generateJSReferences } = MiniHtmlWebpackPlugin;
function generatePage(pagePath): webpack.Plugin {
  const name = path.relative(PATHS.PAGES, pagePath).split(".")[0];

  return new MiniHtmlWebpackPlugin({
    filename: name === "index" ? "index.html" : `${name}/index.html`,
    publicPath: "/",
    chunks: ["common", name],
    context: {
      htmlAttributes: { lang: "en" },
      cssAttributes: {},
      jsAttributes: { defer: "defer" },
    },
    template: ({
      cssAttributes,
      jsAttributes,
      htmlAttributes,
      css,
      js,
      publicPath,
    }) =>
      requireUncached(pagePath).default({
        htmlAttributes,
        cssTags: generateCSSReferences({
          files: css,
          attributes: cssAttributes,
          publicPath,
        }),
        jsTags: generateJSReferences({
          files: js,
          attributes: jsAttributes,
          publicPath,
        }),
      }),
  });
}

function generateDependencies(paths) {
  return {
    plugins: paths.map(path => new AddDependencyPlugin({ path })),
  };
}

// https://stackoverflow.com/a/16060619/228885
function requireUncached(module) {
  delete require.cache[require.resolve(module)];

  return require(module);
}

const developmentConfig: webpack.Configuration = {
  devServer: {
    port: PORT,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
const productionConfig: webpack.Configuration = {
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ["default", { discardComments: { removeAll: true } }],
        },
      }),
    ],
  },
  plugins: [
    new PurgeCSSPlugin({
      whitelistPatterns: [], // Example: /^svg-/
      paths: ALL_COMPONENTS.concat(ALL_PAGES).concat(ALL_LAYOUTS),
      extractors: [
        {
          extractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
          extensions: ["html"],
        },
      ],
      // paths: glob.sync(`${htmlDir}/**/*.html`),
    }),
  ],
};

export default mode => {
  switch (mode) {
    case "development": {
      return merge(commonConfig, developmentConfig, { mode });
    }
    case "production": {
      return merge(commonConfig, productionConfig, { mode });
    }
  }

  throw new Error(`Unknown target: ${mode}`);
};
