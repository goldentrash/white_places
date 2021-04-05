import { gql } from 'apollo-server-lambda';

const projectTypeDefs = gql`
  type Task {
    title: String!
    workers: [String]!
  }

  type Opinion {
    title: String!
    liek: Int!
  }

  union Document = Task | Opinion

  "project information"
  type Project {
    title: String!
    summary: String!

    "use 'inline fragment' to query this filed"
    documents: [Document]!
  }

  "when project have been changed return this type"
  type ChangeProjectResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String!
    project: Project
  }

  "change title's input"
  input ChangeProjectTitleInput {
    title: String!
    newTitle: String!
  }
`;

export default projectTypeDefs;
