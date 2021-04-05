import { gql } from 'apollo-server-lambda';

const queryTypeDefs = gql`
  "query root"
  type Query {
    projects: [Project]!
  }
`;

export default queryTypeDefs;
