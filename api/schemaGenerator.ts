import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { QueryResolver, ProjectResolver } from './resolver';
import path from 'path';

buildSchema({
  resolvers: [QueryResolver, ProjectResolver],
  emitSchemaFile: path.resolve(__dirname, '..', 'gql', 'apiSchema.gql'),
});
