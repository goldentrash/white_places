import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import ErrorBoundary from 'src/ErrorBoundary';
import Root from 'src/routes/Root';
import { BrowserRouter } from 'react-router-dom';
import apolloClient from 'src/apolloClient';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import muiTheme from 'src/muiTheme';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <BrowserRouter>
            <Root />
          </BrowserRouter>
        </ThemeProvider>
      </ApolloProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('application')
);
