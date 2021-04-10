import { ApolloServer } from 'apollo-server-lambda';
import resolvers from './resolvers';
import typeDefs from './schema';
import logger from './logger';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({}),
  dataSources: () => ({}),
  plugins: [logger],
  introspection: false,
  uploads: false,
  playground: false,
  debug: false,
});

export const handler = server.createHandler();
