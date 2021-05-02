import { gql } from 'apollo-server-lambda';

export const query = gql`
  "project information"
  type Project {
    title: String

    "state: active | inActive"
    isActive: Boolean

    "url for programs site"
    repositoryUrl: String
    homepageUrl: String

    "informations related with white palces"
    isFollowed: Boolean
    numOfFollowers: Int
    numOfGeneratedPoint: Int
    numOfInformations: Int
    numOfOpinions: Int
    numOfTasks: Int
  }

  type Query {
    project(id: ID!): Project
  }
`;
