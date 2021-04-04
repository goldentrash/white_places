import React, { ReactElement } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from 'components/header';
import Search from 'page/search';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';

const App = (): ReactElement => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/search" component={Search} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
