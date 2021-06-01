import React, { ReactElement } from 'react';
import { useRoutes, Outlet } from 'react-router-dom';
import AppRoot from './pages/appRoot';
import NavigateToMain from './pages/navigateToMain';
import NotFound from './pages/notFound';
import ProjectRoot from './pages/projectRoot';
import Document from './pages/document';
import Documents from './pages/documents';
import Opinions from './pages/opinions';
import Opinion from './pages/opinion';
import Write from './pages/write';
import Tasks from './pages/tasks';
import Task from './pages/task';
import Timeline from './pages/timeline';
import Setting from './pages/setting';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const Router = (): ReactElement => {
  const elements = useRoutes([
    {
      path: '/',
      element: <AppRoot />,
      children: [
        { path: '*', element: <NotFound /> },
        { path: '/', element: <NavigateToMain /> },
        {
          path: 'projects/:projectTitle',
          element: <ProjectRoot />,
          children: [
            { path: '*', element: <NotFound /> },
            { path: 'timeline', element: <Timeline /> },
            { path: 'setting', element: <Setting /> },
            {
              path: 'documents',
              element: <Outlet />,
              children: [
                { path: '/', element: <Documents /> },
                {
                  path: ':documentTitle',
                  element: <Document />,
                },
                { path: 'write', element: <Write kind="document" /> },
              ],
            },
            {
              path: 'opinions',
              element: <Outlet />,
              children: [
                { path: '/', element: <Opinions /> },
                { path: ':opinionTitle', element: <Opinion /> },
              ],
            },
            {
              path: 'tasks',
              element: <Outlet />,
              children: [
                { path: '/', element: <Tasks /> },
                { path: ':taskTitle', element: <Task /> },
              ],
            },
          ],
        },
      ],
    },
  ]);

  const screenMinWidth = 1440;
  const isDesktop = useMediaQuery(`(min-width:${screenMinWidth}px)`);

  if (!isDesktop) {
    return <div>{screenMinWidth}px 이상의 화면 UI만 제공됩니다</div>;
  }

  if (!elements) {
    throw Error();
  }

  return elements;
};
export default Router;
