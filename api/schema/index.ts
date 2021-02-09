import { buildSchema } from 'graphql';

export default buildSchema(`
  type User {
    name: String!
    age: Int!
  }

  type Query {
    hello: String
    user: [User!]!
    rand(offset: Int!): Int!
  }

  input UserInput {
    name: String!
    age: Int!
  }

  type Mutation {
    insertUser(user: UserInput!): [User!]!
  }
`);
