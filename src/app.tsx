import React, { ReactElement } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import Header from './header';
import Search from './page/search';
import Project from './page/project';

const App = (): ReactElement => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/search" component={Search} />
          <Route path="" component={Project} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
