import {
  QueryResolvers,
  QueryProjectArgs,
  Project,
} from 'codegen/resolver-types';

export const query: QueryResolvers = {
  project(_parent, _args: QueryProjectArgs): Project {
    return {
      __typename: 'Project',
      title: 'white places',
      isActive: true,
      repositoryUrl: '/',
      homepageUrl: '/',
      isFollowed: true,
      numOfFollowers: 33,
      numOfGeneratedPoint: 123,
      numOfInformations: 11111,
      numOfOpinions: 13,
      numOfTasks: 42,
    };
  },
};
