import path from "path";
import webpack from "webpack";
import WebpackWatchedGlobEntries from "webpack-watched-glob-entries-plugin";
import { WebpackPluginServe } from "webpack-plugin-serve";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import MiniHtmlWebpackPlugin from "mini-html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import merge from "webpack-merge";
import glob from "glob";

const PORT = 8080;
const ROOT = __dirname;
const PATHS = {
  ASSETS: path.resolve(ROOT, "assets"),
  SRC: path.resolve(ROOT, "src"),
  OUTPUT: path.resolve(ROOT, "public"),
};

const commonConfig: webpack.Configuration = merge(
  {
    entry: WebpackWatchedGlobEntries.getEntries([
      path.resolve(PATHS.SRC, "**/*.js"),
    ]),
    output: {
      path: PATHS.OUTPUT,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: PATHS.SRC,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(css|pcss)$/,
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
  generatePages(glob.sync(path.join(PATHS.SRC, "*.tsx")))
);

function generatePages(paths) {
  return {
    plugins: paths.map(generatePage),
  };
}

function generatePage(pagePath): webpack.Plugin {
  const name = path.relative(PATHS.SRC, pagePath).split(".")[0];

  return new MiniHtmlWebpackPlugin({
    name: name === "index" ? "index.html" : `${name}/index.html`,
    publicPath: "/",
    chunks: ["common", name],
    context: {
      title: "tailwind-webpack-starter",
      htmlAttributes: { lang: "en" },
      cssAttributes: { rel: "preload" },
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
      // TODO: import now instead
      return "<html><head></head><body>demo</body></html>";
    },
  });
}

const developmentConfig: webpack.Configuration = {
  entry: ["webpack-plugin-serve/client"],
  plugins: [new WebpackPluginServe({ port: PORT })],
  watch: true,
};
const productionConfig: webpack.Configuration = {};

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
