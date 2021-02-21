const fakeDB = [{ title: '111', summary: 'asdfasdf' }];

interface Project {
  title: string;
  summary: string;
}

export const resolvers = {
  Query: {
    projects(): Project[] {
      return fakeDB;
    },
  },
};
