import 'dotenv/config.js';
import { ApolloServer } from 'apollo-server-lambda';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import resolvers from './resolver';
import typeDefs from './typeDefs';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    faunaClient: new ApolloClient({
      uri: 'https://graphql.fauna.com/graphql',
      cache: new InMemoryCache(),
    }),
  }),
  introspection: true,
  debug: false,
});

export const handler = server.createHandler();
