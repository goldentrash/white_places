import { graphql } from 'graphql';
import { schema } from './schema';
import * as resolver from './resolver';

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

    const escapedRequestBody = event.body.replace(/\n/g, ''); // JSON.parse can't resolve sapce included string
    const requestBody = JSON.parse(escapedRequestBody);
    const graphqlQuery = requestBody?.query ?? '';
    const graphqlVariables = requestBody?.variables ?? {};
    const result = await graphql(
      schema,
      graphqlQuery,
      resolver,
      null,
      graphqlVariables
    );
    const statusCode = result?.errors ? 400 : 200;

    return {
      statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    // not resolvable request
    console.error(error);

    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};
