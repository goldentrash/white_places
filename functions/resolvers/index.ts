import { Resolvers } from 'codegen/resolver-types';
import queryResolver from './query';
import mutationResolver from './mutation';
import mutationResponseResolver from './mutationResponse';
import documentResolver from './document';

const resolvers: Resolvers = {
  Query: queryResolver,
  Mutation: mutationResolver,
  Document: documentResolver,
  MutationResponse: mutationResponseResolver,
};

export default resolvers;
