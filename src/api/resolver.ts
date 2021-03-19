import { Resolvers, Project } from './codegen/types';

const projectList: Project[] = [
  {
    title: 'hi',
    summary: 'hello',
  },
  {
    title: 'hi2',
    summary: 'hello',
  },
  {
    title: 'hi',
    summary: 'heasdfasdllo',
  },
  {
    title: 'hifff',
    summary: 'fdffdhello',
  },
];

const resolvers: Resolvers = {
  Query: {
    projects: () => projectList,
  },
};

export default resolvers;
