const { test } = require('./helper');

exports.handler = async (event: any, context: any) => {
	return {
		statusCode: 200,
		body: `hello${test(1)}`,
	};
};
