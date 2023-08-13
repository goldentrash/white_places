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
import goTrue, { GoTrueContext } from 'src/goTrue';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ApolloProvider client={apolloClient}>
        <GoTrueContext.Provider value={goTrue}>
          <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <BrowserRouter>
              <Root />
            </BrowserRouter>
          </ThemeProvider>
        </GoTrueContext.Provider>
      </ApolloProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('application')
);
