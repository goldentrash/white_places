import { ApolloServer } from 'apollo-server-lambda';
import { typeDefs } from './schema';
import { resolvers } from './resolver';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  debug: false,
});

export const handler = server.createHandler();
