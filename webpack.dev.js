const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    entry: {
        app: ["./demo/sample.ts"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./demo/sample.html",
        }),
    ],
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./demo",
        port: 8081,
    },
});
