const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const dependencies = require('../package.json').dependencies;

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "../src", "index.ts"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    open: true,
    port: 5002,
  },
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve(__dirname, "../src"),
        exclude: path.resolve(__dirname, "node_modules"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults",
                  },
                ],
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpeg|gif|jpg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.webp$/i,
        use: ["file-loader","webp-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "utils",
      filename: "remoteEntry.js",
      exposes: {
        "./handleHelloWorldAlert": "./src/utils/handleHelloWorldAlert.ts"
      },
      shared: {
        "react": {
          singleton: true,
          strictVersion: true,
          requiredVersion: dependencies['react'],
        },
        "react-dom/client": {
          singleton: true,
          strictVersion: true,
          requiredVersion: dependencies['react-dom'],
        },
      }
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "async",
    },
  },
};
