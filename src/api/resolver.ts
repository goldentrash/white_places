import { Project, Query } from './generated/graphql';

const fakeDB = [{ title: '111', summary: 'asdfasdf' }];

export const resolvers: { Query: Query } = {
  Query: {
    projects(): Project[] {
      return fakeDB;
    },
  },
};
