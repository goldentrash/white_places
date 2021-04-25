import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import {
  CssThemeProvider,
  ApolloClientProvider,
  RouterProvider,
} from './providers';

ReactDOM.render(
  <React.StrictMode>
    <CssThemeProvider>
      <ApolloClientProvider>
        <RouterProvider>
          <App />
        </RouterProvider>
      </ApolloClientProvider>
    </CssThemeProvider>
  </React.StrictMode>,
  document.getElementById('application')
);
