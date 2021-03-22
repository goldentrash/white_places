import 'dotenv/config';
import { ApolloServer } from 'apollo-server-lambda';
import resolvers from './resolver';
import typeDefs from './typeDefs';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({}),
  introspection: true,
  debug: false,
});

export const handler = server.createHandler();
