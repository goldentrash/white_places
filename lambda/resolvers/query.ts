import { QueryResolvers } from 'codegen/resolver-types';

export const query: QueryResolvers = {
  greeting() {
    return 'Hello World!';
  },
};
