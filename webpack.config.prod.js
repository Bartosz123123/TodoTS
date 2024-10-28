const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './src/app.ts',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'], // Loaders for CSS
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'], // Loaders for SCSS
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js', '.scss', '.css'],
	},
	plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
