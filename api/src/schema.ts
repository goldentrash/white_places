import { gql } from 'apollo-server-lambda';

export const typeDefs = gql`
  type Project {
    title: String!
    summary: String!
  }

  type Query {
    projects: [Project!]!
  }
`;
