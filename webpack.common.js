const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: {
        app: ["./src/index.ts"],
    },
    plugins: [new CleanWebpackPlugin()],
    output: {
        filename: "chordproject-parser.bundle.js",
        path: path.resolve(__dirname, "dist"),
        library: "ChordProjectParser",
        libraryTarget: "umd",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        jquery: "jQuery",
    },
};
