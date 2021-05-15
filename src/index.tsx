import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import Provider from './provider';

ReactDOM.render(
  <React.StrictMode>
    <Provider.CssTheme>
      <Provider.ApolloClient>
        <Provider.ReactRouter>
          <App />
        </Provider.ReactRouter>
      </Provider.ApolloClient>
    </Provider.CssTheme>
  </React.StrictMode>,
  document.getElementById('application')
);
