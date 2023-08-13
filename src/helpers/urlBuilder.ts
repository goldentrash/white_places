import { generatePath } from 'react-router-dom';
import RootLevelPath, {
  ProfileParams,
  ProjectParams,
} from 'src/routes/RootLevelPath';

const main = (): string => generatePath(RootLevelPath.Main);
const auth = (): string => generatePath(RootLevelPath.Auth);
const profile = (params: ProfileParams): string =>
  generatePath(RootLevelPath.Profile, params);
const project = (params: ProjectParams): string =>
  generatePath(RootLevelPath.Project, params);
const search = (): string => generatePath(RootLevelPath.Search);

export default {
  main,
  auth,
  profile,
  project,
  search,
};
