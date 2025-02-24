const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  name: "webpack-three-js",
  mode: "development",

  entry: {
    app: ["./src/index.js"],
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "dist", "index.html"),
      hash: true,
    }),
    new CopyPlugin({
      patterns: [{ from: "src/assets/", to: "assets/" }],
      options: {
        concurrency: 100,
      },
    }),
  ],

  devServer: {
    open: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    host: "0.0.0.0",
    compress: true,
    port: 9000,
  },
};
