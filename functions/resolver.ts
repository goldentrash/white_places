import { Resolvers, QueryResolvers, Project } from './generated/types';

const projectList: Project[] = [
  {
    title: 'hi',
    summary: 'df',
  },
  {
    title: 'h2',
    summary: 'df',
  },
  {
    title: 'h2',
    summary: 'aaaaadf',
  },
];

const queryResolver: QueryResolvers = {
  projects: () => projectList,
};

const resolvers: Resolvers = {
  Query: queryResolver,
};

export default resolvers;
