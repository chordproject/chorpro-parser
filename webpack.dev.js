const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = merge(common, {
    entry: {
        app: "./demo/sample.ts",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./demo/sample.html",
        }),
    ],
    mode: "development",
    devtool: "inline-source-map", // Useful for debugging
    devServer: {
        static: {
            directory: path.resolve(__dirname, "demo"), // Replaces contentBase
        },
        port: 8081,
        open: true, // Automatically open the browser
        hot: true, // Enable Hot Module Replacement
        compress: true, // Enable gzip compression
    },
});
