import { ApolloServer } from 'apollo-server-lambda';
import logger from 'lambda/logger';
import typeDefs from 'lambda/typeDefs';
import resolvers from 'lambda/resolvers';
import context from 'lambda/context';

const apolloServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: context,
  plugins: [logger],
  introspection: process.env.NODE_ENV !== 'production',
  uploads: false,
  playground: process.env.NODE_ENV !== 'production',
  debug: process.env.NODE_ENV !== 'production',
});

const handler = apolloServer.createHandler();

export { handler, apolloServer };
