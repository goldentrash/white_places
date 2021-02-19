import 'reflect-metadata';
import {
  APIGatewayProxyEvent,
  Context,
  Callback,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';
import { buildTypeDefsAndResolvers } from 'type-graphql';
import { QueryResolver, ProjectResolver } from './resolver';

export const handler = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<APIGatewayProxyResult>
): void => {
  const bootstrap = async () => {
    const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
      resolvers: [QueryResolver, ProjectResolver],
    });

    const server = new ApolloServer({ typeDefs, resolvers, debug: false });
    const app = server.createHandler();

    app(event, context, callback);
  };

  bootstrap();
};
