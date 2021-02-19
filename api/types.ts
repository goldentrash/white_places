import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Query {
  @Field((type) => [Project!]!)
  projects!: Project[];
}

@ObjectType()
export class Project {
  @Field((type) => String!)
  name!: string;

  @Field((type) => String!)
  summary!: string;
}
