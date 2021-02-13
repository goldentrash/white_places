import { graphql } from 'graphql';
import root from './resolver';
import schema from './schema';
import colors from 'colors';

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
  try {
    // we only resolve graphql that must be POST request
    if (event.httpMethod !== 'POST') {
      console.log('405 Method Not Allowed');
      return {
        statusCode: 405,
        body: 'Method Not Allowed',
      };
    }

    console.log(colors.yellow("Let's resolve request!"));
    console.log();
    const escapedRequestBody = event.body.replace(/[\n\r\t\f\v]/g, ''); // JSON.parse can't resolve sapce included string
    const requestBody = JSON.parse(escapedRequestBody);

    const graphqlQuery = requestBody?.query ?? '';
    console.log(colors.blue('query'));
    console.log(graphqlQuery);
    console.log();

    const graphqlVariables = requestBody?.variables ?? {};
    console.log(colors.blue('variables'));
    console.log(graphqlVariables);
    console.log();

    const result = await graphql(
      schema,
      graphqlQuery,
      root,
      null,
      graphqlVariables
    );

    if (result.errors) {
      console.log(colors.blue('grapnql error'));
      console.error(result.errors);
      console.log();
    }

    return {
      statusCode: result.errors ? 400 : 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    // not resolvable request
    console.log(colors.blue('something wrong'));
    console.error(error);
    console.log();

    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};
