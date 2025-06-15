const path = require("path");

module.exports = {
    entry: {
        app: "./src/index.ts",
    },
    output: {
        filename: "chordproject-parser.bundle.js", // Use dynamic naming for better caching
        path: path.resolve(__dirname, "dist"),
        library: {
            name: "ChordProjectParser",
            type: "umd", // Modern library target
        },
        clean: true, // Automatically clean the output directory (replaces CleanWebpackPlugin in Webpack 5+)
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true, // Desactiva las verificaciones de tipo
                    },
                },
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"], // Resolve these extensions
    },
    externals: {
        jquery: "jQuery", // Mark jQuery as an external dependency
    },
};
