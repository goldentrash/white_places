import React from 'react';
import ReactDOM from 'react-dom';
import Provider from './provider';
import { Router } from './router';

ReactDOM.render(
  <React.StrictMode>
    <Provider.CssTheme>
      <Provider.ApolloClient>
        <Provider.ReactRouter>
          <Router />
        </Provider.ReactRouter>
      </Provider.ApolloClient>
    </Provider.CssTheme>
  </React.StrictMode>,
  document.getElementById('application')
);
