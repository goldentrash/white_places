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
          ],
        },
      ],
    },
  ]);

  if (!elements) {
    throw Error();
  }

  return elements;
};
export default Router;
