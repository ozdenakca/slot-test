const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.ts",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash].js", // Use unique filenames
      clean: true, // Automatically clean the output directory
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
    devServer: {
      static: path.resolve(__dirname, "dist"), // Serve static files from "dist"
      open: true,
      hot: true,
      port: 3000,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "My PIXI App",
        template: "template/index.html",
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: "assets", to: "assets" }],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: "ts-loader",
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/images/[name][ext]",
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[name][ext]",
          },
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
      runtimeChunk: {
        name: "runtime", // Avoid filename conflict for runtime chunk
      },
    },
    performance: {
      hints: isProduction ? "warning" : false,
      maxAssetSize: 512000,
      maxEntrypointSize: 1024000,
    },
  };
};
