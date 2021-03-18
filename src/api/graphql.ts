import { ApolloServer } from 'apollo-server-lambda';
import { readFileSync } from 'fs';
import { resolvers } from './resolver';
import path from 'path';

const typeDefs = readFileSync(
  path.resolve(__dirname, 'schema.graphql'),
  'utf-8'
);

console.log(typeDefs);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  debug: false,
});

export const handler = server.createHandler();
