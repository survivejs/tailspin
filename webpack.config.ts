import path from "path";
import webpack from "webpack";
import WebpackWatchedGlobEntries from "webpack-watched-glob-entries-plugin";
import { WebpackPluginServe } from "webpack-plugin-serve";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";
import merge from "webpack-merge";

const PORT = 8080;
const ROOT = __dirname;
const PATHS = {
  ASSETS: path.resolve(ROOT, "assets"),
  SRC: path.resolve(ROOT, "src"),
  OUTPUT: path.resolve(ROOT, "public"),
};

const commonConfig: webpack.Configuration = {
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
};

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
