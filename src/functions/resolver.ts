import { Resolvers, Project, QueryResolvers } from './codegen/types';

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

const queryResolver: QueryResolvers = {
  projects: () => projectList,
  project: (_, { title }) => {
    return (
      projectList.find((project) => project.title === title) ?? projectList[0]
    );
  },
};

const resolvers: Resolvers = {
  Query: queryResolver,
};

export default resolvers;
