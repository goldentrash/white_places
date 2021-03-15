import { ApolloServer } from 'apollo-server-lambda';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { resolvers } from './resolver';
import path from 'path';

const schema = loadSchemaSync(path.resolve(__dirname, '..', 'api.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

console.log(schema);

const server = new ApolloServer({
  schema,
  resolvers,
  debug: false,
});

export const handler = server.createHandler();
