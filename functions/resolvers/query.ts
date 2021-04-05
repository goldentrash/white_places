import { QueryResolvers } from 'codegen/resolver-types';
import projectList from '../fakeDB';

const queryResolver: QueryResolvers = {
  projects: () => projectList,
};

export default queryResolver;
