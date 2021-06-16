import { ApolloServer } from 'apollo-server-lambda';
import logger from 'lambda/logger';

const apolloServer = new ApolloServer({
  typeDefs: [],
  resolvers: {},
  dataSources: () => {
    return {};
  },
  plugins: [logger],
  introspection: process.env.NODE_ENV !== 'production',
  uploads: false,
  playground: process.env.NODE_ENV !== 'production',
  debug: process.env.NODE_ENV !== 'production',
});

export const handler = apolloServer.createHandler();
