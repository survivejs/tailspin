import path from "path";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import merge from "webpack-merge";

const ROOT = __dirname;
const PATHS = {
  SRC: path.resolve(ROOT, "src"),
};

const commonConfig: webpack.Configuration = {
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
};

const developmentConfig: webpack.Configuration = {};
const productionConfig: webpack.Configuration = {};

export default env => {
  switch (env) {
    case "development": {
      return merge(commonConfig, developmentConfig);
    }
    case "production": {
      return merge(commonConfig, productionConfig);
    }
  }

  throw new Error(`Unknown target: ${env}`);
};
