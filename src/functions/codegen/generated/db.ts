export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Long: any;
  Time: any;
};









export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  updateProject?: Maybe<Project>;
  deleteProject?: Maybe<Project>;
};


export type MutationCreateProjectArgs = {
  data: ProjectInput;
};


export type MutationUpdateProjectArgs = {
  id: Scalars['ID'];
  data: ProjectInput;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID'];
};

export type Project = {
  __typename?: 'Project';
  _id: Scalars['ID'];
  _ts: Scalars['Long'];
  title: Scalars['String'];
  summary: Scalars['String'];
};

export type ProjectInput = {
  title: Scalars['String'];
  summary: Scalars['String'];
};

export type ProjectPage = {
  __typename?: 'ProjectPage';
  data: Array<Maybe<Project>>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  findProjectByID?: Maybe<Project>;
  projects: ProjectPage;
  project: Project;
};


export type QueryFindProjectByIdArgs = {
  id: Scalars['ID'];
};


export type QueryProjectsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type QueryProjectArgs = {
  title: Scalars['String'];
};

