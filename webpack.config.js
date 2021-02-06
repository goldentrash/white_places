const path = require('path');

module.exports = {
	mode: 'production',
	target: 'node',
	devtool: 'inline-source-map',
	entry: {
		graphql: path.resolve(__dirname, 'api/graphql.ts'),
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'functions'),
		libraryTarget: 'umd',
	},
	resolve: {
		extensions: ['.ts', 'js', 'json'],
	},
	module: {
		rules: [
			{
				test: /\.ts/,
				use: 'ts-loader',
			},
		],
	},
};
