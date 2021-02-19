import { Resolver, Query, FieldResolver, Root } from 'type-graphql';
import { Project } from './types';
import { projectList } from './fakeDB';

@Resolver()
export class QueryResolver {
  @Query((returns) => [Project])
  projects() {
    return projectList;
  }
}

@Resolver((of) => Project)
export class ProjectResolver {
  @FieldResolver((returns) => String!)
  titleAndSummary(@Root() project: Project) {
    return project.name + ' ++ ' + project.summary;
  }
}
