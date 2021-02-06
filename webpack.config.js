const path = require('path');

module.exports = {
	mode: 'production',
	devtool: 'inline-source-map',
	entry: {
		graphql: path.resolve(__dirname, 'api/graphql.ts'),
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'functions'),
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
