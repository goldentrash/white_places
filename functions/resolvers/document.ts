import { DocumentResolvers } from 'codegen/resolver-types';

const documentResolver: DocumentResolvers = {
  __resolveType: ({ __typename }) => {
    switch (__typename) {
      case 'Task':
        return 'Task';
      case 'Opinion':
        return 'Opinion';
      default:
        return null;
    }
  },
};

export default documentResolver;
