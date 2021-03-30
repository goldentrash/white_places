import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type Project {
    title: String!
    summary: String!
  }

  type Query {
    projects: [Project!]!
  }
`;

export default typeDefs;
