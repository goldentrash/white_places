import { graphql, buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const resolver = { hello: () => 'hello' };

interface Headers {
  'content-type'?: string;
  accept?: string;
  host?: string;
  'accept-encoding'?: string;
  'content-length'?: string;
}

interface Event {
  path: string;
  httpMethod: string;
  queryStringParameters: Record<string, unknown>;
  headers: Headers;
  body: string;
}

interface Response {
  statusCode: number;
  headers?: Record<string, unknown>;
  body: string;
}

export const handler = async (event: Event): Promise<Response> => {
  // we only resolve graphql that must be POST request
  if (event.httpMethod !== 'POST') {
    console.log('405 Method Not Allowed');
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const escapedRequestBody = event.body.replace(/\s/g, ''); // JSON.parse can't resolve sapce included string
    const requestBody = JSON.parse(escapedRequestBody);
    const graphqlQuery = requestBody?.query ?? '';
    const result = await graphql(schema, graphqlQuery, resolver);
    if (!result.data) throw Error();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result.data),
    };
  } catch (error) {
    // not resolvable request
    console.log(error);
    return {
      statusCode: 400,
      body: 'Bad Request',
    };
  }
};
