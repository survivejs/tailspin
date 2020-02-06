import path from "path";
import webpack from "webpack";
import WebpackWatchedGlobEntries from "webpack-watched-glob-entries-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import MiniHtmlWebpackPlugin from "mini-html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import merge from "webpack-merge";
import glob from "glob";

const PORT = 8080;
const ROOT = __dirname;
const PATHS = {
  ASSETS: path.resolve(ROOT, "assets"),
  JS: path.resolve(ROOT, "js"),
  LAYOUTS: path.resolve(ROOT, "layouts"),
  PAGES: path.resolve(ROOT, "pages"),
  OUTPUT: path.resolve(ROOT, "public"),
};

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
  generatePages(glob.sync(path.join(PATHS.PAGES, "*.tsx")))
);

function generatePages(paths) {
  return {
    plugins: paths.map(generatePage),
  };
}

function generatePage(pagePath): webpack.Plugin {
  const name = path.relative(PATHS.PAGES, pagePath).split(".")[0];

  return new MiniHtmlWebpackPlugin({
    filename: name === "index" ? "index.html" : `${name}/index.html`,
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
      // TODO: Inject above to the template
    }) => require(pagePath).default,
  });
}

const developmentConfig: webpack.Configuration = {
  devServer: {
    port: PORT,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
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
