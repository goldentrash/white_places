export const enum Path {
  NotFound = '*',
  Introduction = '/',
  Profile = 'user/:userId/*',
  Project = 'project/:projectId/*',
}

import { generatePath } from 'react-router-dom';
export const Url = {
  Introduction(): string {
    return generatePath(Path.Introduction, {});
  },
  Profile(userId: string): string {
    return generatePath(Path.Profile, { userId });
  },
  Project(projectId: string): string {
    return generatePath(Path.Project, { projectId });
  },
};
