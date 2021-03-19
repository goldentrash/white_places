import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type Project {
    title: String!
    summary: String!
  }

  type Query {
    project(title: String!): Project!
    projects: [Project!]!
  }
`;

export default typeDefs;
