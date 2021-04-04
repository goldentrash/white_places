import { Resolvers, QueryResolvers, Project } from 'codegen/resolver-types';

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
  {
    title: 'need some new title!',
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
