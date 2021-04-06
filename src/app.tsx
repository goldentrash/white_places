import React, { ReactElement } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import Header from 'components/header';
import Search from './page/search';
import Introduction from './page/introduction';

const App = (): ReactElement => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/search" component={Search} />
          <Route path="" component={Introduction} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
