const enum RootLevelPath {
  Main = '/',
  Auth = '/auth',
  Profile = '/profile/:userID',
  Project = '/project/:projectID',
  Search = '/search',
}

type ProfileParams = {
  userID: string;
};

type ProjectParams = {
  projectID: string;
};

export default RootLevelPath;
export { ProfileParams, ProjectParams };
