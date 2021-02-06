import { helper } from './helper';

export const handler = async (event: any, context: any) => {
	return {
		stattusCode: 200,
		body: `Hello ${helper(1)}`,
	};
};
