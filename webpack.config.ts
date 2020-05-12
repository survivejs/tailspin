import path from "path";
import webpack from "webpack";
import WebpackWatchedGlobEntries from "webpack-watched-glob-entries-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {
  MiniHtmlWebpackPlugin,
  generateCSSReferences,
  generateJSReferences,
} from "mini-html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import PurgeCSSPlugin from "purgecss-webpack-plugin";
import TerserJSPlugin from "terser-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import { AddDependencyPlugin } from "webpack-add-dependency-plugin";
import merge from "webpack-merge";
import glob from "glob";
import decache from "decache";

const PORT = 8080;
const ROOT = __dirname;
const PATHS = {
  ASSETS: path.resolve(ROOT, "assets"),
  SRC: path.resolve(ROOT, "src"),
  OUTPUT: path.resolve(ROOT, "public"),
};
const ALL_FILES = glob.sync(path.join(PATHS.SRC, "**/*.tsx"));
const ALL_PAGES = glob.sync(path.join(PATHS.SRC, "**/index.tsx"));

const commonConfig: webpack.Configuration = merge(
  {
    entry: WebpackWatchedGlobEntries.getEntries([
      path.resolve(PATHS.SRC, "**/_*.ts"),
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
          test: /\.ts(x)$/,
          include: PATHS.SRC,
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
  generateDependencies(ALL_FILES)
);

function generatePages(paths) {
  return {
    plugins: paths.map(generatePage),
  };
}

function generatePage(pagePath): webpack.Plugin {
  const pageName = path.relative(PATHS.SRC, pagePath).split(".")[0];
  const chunkName = `${pageName.split("index")[0]}_page`;

  return new MiniHtmlWebpackPlugin({
    filename: `${pageName}.html`,
    publicPath: "/",
    chunks: ["_shared", chunkName],
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
    }) => {
      decache(pagePath);

      return require(pagePath).default({
        htmlAttributes,
        cssTags: generateCSSReferences({
          files: css,
          attributes: cssAttributes,
          publicPath,
        }),
        jsTags: generateJSReferences({
          files: js,
          attributes: jsAttributes || {},
          publicPath,
        }),
      });
    },
  });
}

function generateDependencies(paths) {
  return {
    plugins: paths.map(path => new AddDependencyPlugin({ path })),
  };
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
      paths: ALL_FILES,
      extractors: [
        {
          extractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
          extensions: ["html"],
        },
      ],
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
