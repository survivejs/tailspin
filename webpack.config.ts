import path from "path";
import webpack from "webpack";
import WebpackWatchedGlobEntries from "webpack-watched-glob-entries-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import RedirectWebpackPlugin from "redirect-webpack-plugin";
import {
  MiniHtmlWebpackPlugin,
  generateCSSReferences,
  generateJSReferences,
} from "mini-html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import TerserJSPlugin from "terser-webpack-plugin";
import { WebpackPluginServe } from "webpack-plugin-serve";
import { AddDependencyPlugin } from "webpack-add-dependency-plugin";
import { merge } from "webpack-merge";
import glob from "glob";
import decache from "decache";

const PORT = 8080;
const ROOT = __dirname;
const PATHS = {
  ASSETS: path.join(ROOT, "assets"),
  BLOG: path.join(ROOT, "data", "blog"),
  DS: path.join(ROOT, "ds"),
  PAGES: path.join(ROOT, "pages"),
  OUTPUT: path.join(ROOT, "public"),
};
const ALL_FILES = glob.sync(path.join(PATHS.PAGES, "**", "*.tsx"));
const ALL_PAGES = glob.sync(path.join(PATHS.PAGES, "**", "index.tsx"));
const BLOG_PAGES = glob.sync(path.join(PATHS.BLOG, "**", "*.md"));

const commonConfig: webpack.Configuration = merge(
  {
    output: {
      path: PATHS.OUTPUT,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: [PATHS.DS, PATHS.PAGES],
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              configFile: path.join(__dirname, "tsconfig.webpack.json"),
            },
          },
        },
        {
          test: /\.js$/,
          enforce: "pre",
          use: "source-map-loader",
        },
      ],
    },
    plugins: [
      new WebpackWatchedGlobEntries(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new CopyPlugin({ patterns: [{ from: PATHS.ASSETS, to: "assets" }] }),
      new RedirectWebpackPlugin({
        redirects: {
          components: "/design-system/",
        },
      }),
    ],
    stats: "errors-only",
  },
  generateBlogPages(BLOG_PAGES),
  generatePages(ALL_PAGES),
  generateDependencies(ALL_FILES)
);

// TODO: Handle this with a GraphQL connector.
// It would have to generate a blog index + page per each
// -> MiniHtmlWebpackPlugin for each of these
// This will have to be async (push earlier in the process).
function generateBlogPages(paths) {
  console.log("generate blog pages", paths);
  // TODO: Get this from GraphQL
  // TODO: Add images
  const urlPrefix = "blog";
  const pages = [
    {
      title: "Demo post 1",
      description: "demo description 1",
      date: new Date().toString(),
      categories: ["demo"],
      slug: "demo-post-1",
      author: "Juho Vepsäläinen",
      article: "Demo post 1 content goes here",
    },
    {
      title: "Demo post 2",
      description: "demo description 2",
      date: new Date().toString(),
      categories: ["demo"],
      slug: "demo-post-2",
      author: "Juho Vepsäläinen",
      article: "Demo post 2 content goes here",
    },
  ].map((page) => ({ ...page, urlPrefix, layout: "./ds/layouts/blog-page" }));

  return {
    plugins: [
      generateBlogIndex({
        layout: "./ds/layouts/blog-index",
        urlPrefix,
        pages,
      }),
    ].concat(pages.map(generateBlogPage)),
  };
}

function generateBlogIndex({ layout, urlPrefix, pages }): webpack.Plugin {
  return new MiniHtmlWebpackPlugin({
    filename: `${urlPrefix}/index.html`,
    publicPath: "/",
    chunks: ["_shared"],
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
      decache(layout);

      return `<!DOCTYPE html>\n${require(layout).default({
        url: urlPrefix,
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
        pages,
      })}`;
    },
  });
}

function generateBlogPage({
  urlPrefix,
  slug,
  layout,
  ...content
}): webpack.Plugin {
  const url = `${urlPrefix}/${slug}`;

  return new MiniHtmlWebpackPlugin({
    filename: `${url}/index.html`,
    publicPath: "/",
    chunks: ["_shared"],
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
      decache(layout);

      return `<!DOCTYPE html>\n${require(layout).default({
        url,
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
        content,
      })}`;
    },
  });
}

function generatePages(paths) {
  return {
    plugins: paths.map(generatePage),
  };
}

function generatePage(pagePath): webpack.Plugin {
  const pageName = path.relative(PATHS.PAGES, pagePath).split(".")[0];
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

      return `<!DOCTYPE html>\n${require(pagePath).default({
        url: resolveUrl(pageName),
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
      })}`;
    },
  });
}

function resolveUrl(p) {
  const ret = p.replace("/index", "").replace("index", "/");

  return ret === "/" ? ret : `/${ret}/`;
}

function generateDependencies(paths) {
  return {
    plugins: paths.map((path) => new AddDependencyPlugin({ path })),
  };
}

const developmentConfig: webpack.Configuration = {
  watch: true,
  entry: () =>
    addEntryToAll(
      WebpackWatchedGlobEntries.getEntries([
        path.resolve(PATHS.PAGES, "**/_*.ts"),
      ])(),
      "webpack-plugin-serve/client"
    ),
  plugins: [
    new WebpackPluginServe({
      port: PORT,
      // Only live reload for now
      liveReload: true,
      // hmr: true,
      progress: "minimal",
      static: [PATHS.OUTPUT],
      waitForBuild: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.p?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          "css-loader",
          "postcss-loader",
        ],
      },
    ],
  },
};

function addEntryToAll(entries, entry) {
  const ret = {};

  Object.keys(entries).forEach((key) => {
    ret[key] = [entries[key], entry];
  });

  return ret;
}

const productionConfig: webpack.Configuration = {
  entry: WebpackWatchedGlobEntries.getEntries([
    path.resolve(PATHS.PAGES, "**/_*.ts"),
  ]),
  devtool: false,
  optimization: {
    minimizer: [new TerserJSPlugin({})],
  },
  module: {
    rules: [
      {
        test: /\.p?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
};

export default (mode) => {
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
