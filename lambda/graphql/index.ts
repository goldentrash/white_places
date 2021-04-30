import { ApolloServer } from 'apollo-server-lambda';
import { Resolvers } from 'codegen/resolver-types';
import { query as queryResolver } from './resolvers';
import { query as queryTypeDefs } from './typeDefs';
import { logger } from './plugins';
import { GithubAPI } from './dataSources/github';

const typeDefs = [queryTypeDefs];

const resolvers: Resolvers = {
  Query: queryResolver,
};

const dataSources = { githubApi: new GithubAPI() };

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return dataSources;
  },
  plugins: [logger],
  introspection: process.env.NODE_ENV !== 'production',
  uploads: false,
  playground: process.env.NODE_ENV !== 'production',
  debug: process.env.NODE_ENV !== 'production',
});

export const handler = apolloServer.createHandler();
