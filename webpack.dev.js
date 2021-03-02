const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
	entry: {
		app: ['./demo/sample.ts', './src/index.ts'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'ChordProject parser',
			templateContent: `<p>Check the console...</p>`,
		}),
	],
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './demo',
	},
});
