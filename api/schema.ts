import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type User {
    name: String!
    age: Int!
  }

  type Query {
    hello: String
    user: [User!]!
    rand(offset: Int!): Int!
  }
`);
