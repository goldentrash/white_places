import { gql } from 'apollo-server-lambda';

const mutaitionTypeDefs = gql`
  "mutation root"
  type Mutation {
    chagneProjectTitle(
      changeProjectTitleInput: ChangeProjectTitleInput!
    ): ChangeProjectResponse!
  }

  "all mutaition response must implements this"
  interface MutationResponse {
    code: Int!
    success: Boolean!
    message: String!
  }
`;

export default mutaitionTypeDefs;
