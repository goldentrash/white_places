import { QueryResolvers, Resolvers } from 'codegen/resolver-types';

const Query: QueryResolvers = {
  hello(_parent, _args, _context): string {
    return 'hello';
  },
};

const resolvers: Resolvers = {
  Query,
};

export default resolvers;
