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
const ALL_PAGES = glob.sync(path.join(PATHS.PAGES, "*.tsx"));

interface AddDependencyPluginOptions {
  path: string;
}

class AddDependencyPlugin implements webpack.Plugin {
  private readonly options: AddDependencyPluginOptions;

  constructor(options: AddDependencyPluginOptions) {
    this.options = options;
  }

  plugin = (
    compilation: webpack.compilation.Compilation,
    callback: () => void
  ) => {
    const { path } = this.options;

    compilation.fileDependencies.add(path);

    callback();
  };

  apply(compiler: webpack.Compiler) {
    compiler.hooks.emit.tapAsync("AddDependencyPlugin", this.plugin);
  }
}

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
  generatePages(ALL_PAGES),
  generateDependencies(ALL_PAGES)
);

function generatePages(paths) {
  return {
    plugins: paths.map(generatePage),
  };
}

const {
  generateAttributes,
  generateCSSReferences,
  generateJSReferences,
} = MiniHtmlWebpackPlugin;

function generatePage(pagePath): webpack.Plugin {
  const name = path.relative(PATHS.PAGES, pagePath).split(".")[0];

  return new MiniHtmlWebpackPlugin({
    filename: name === "index" ? "index.html" : `${name}/index.html`,
    publicPath: "/",
    chunks: ["common", name],
    context: {
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
