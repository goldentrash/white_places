import { ApolloServer } from 'apollo-server-lambda';
import { Resolvers } from 'codegen/resolver-types';
import { query as queryResolver } from './resolvers';
import { query as queryTypeDefs } from './typeDefs';
import { logger } from './plugins';

const isProduction = process.env.NODE_ENV === 'production';

const typeDefs = [queryTypeDefs];

const resolvers: Resolvers = {
  Query: queryResolver,
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({}),
  dataSources: () => ({}),
  plugins: [logger],
  introspection: false,
  uploads: false,
  playground: !isProduction,
  debug: !isProduction,
});

export const handler = apolloServer.createHandler();
