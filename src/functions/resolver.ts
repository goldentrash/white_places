import { Resolvers, QueryResolvers, Project } from './generated/types';

const projectList: Project[] = [
  {
    title: 'hi',
    summary: 'df',
  },
];

const queryResolver: QueryResolvers = {
  projects: () => projectList,
};

const resolvers: Resolvers = {
  Query: queryResolver,
};

export default resolvers;
