import { helper } from './helper';

export const handler = async (event: any, context: any) => {
	return {
		statusCode: 200,
		body: JSON.stringify({ event, context }),
	};
};
