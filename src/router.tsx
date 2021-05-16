import React, { ReactElement } from 'react';
import { useRoutes, Outlet } from 'react-router-dom';
import {
  AppRoot,
  Introduction,
  NotFound,
  ProjectRoot,
  Documents,
  Document,
  Error,
} from './pages';

const routes = [
  {
    path: '/',
    element: <AppRoot />,
    children: [
      { path: '*', element: <NotFound /> },
      { path: '/', element: <Introduction /> },
      {
        path: 'project/:projectId',
        element: <ProjectRoot />,
        children: [
          { path: '*', element: <NotFound /> },
          {
            path: 'documents',
            element: <Outlet />,
            children: [
              { path: '/', element: <Documents /> },
              {
                path: ':documentId',
                element: <Document />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export const Router = (): ReactElement => {
  return useRoutes(routes) ?? <Error />;
};
