import { apolloServer } from 'lambda/index';
import { HelloQueryVariables, HelloDocument } from 'codegen/document-types';
import { HandlerContext } from '@netlify/functions';

const queryHello = async (variables: HelloQueryVariables) => {
  const mockedContext: Partial<HandlerContext> = {
    clientContext: {},
  };

  return await apolloServer.executeOperation(
    {
      operationName: 'Hello',
      query: HelloDocument,
      variables,
    },
    { context: mockedContext }
  );
};

test('query hello must get "hello"', async () => {
  const variables: HelloQueryVariables = {};

  const result = await queryHello(variables);

  expect(result.errors).toBeUndefined();
  expect(result.data?.hello).toBe('hello');
});
