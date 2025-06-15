const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "production",
    optimization: {
        minimize: true, // Minify the output
        splitChunks: {
            chunks: "all", // Code splitting for better performance
        },
    },
});
