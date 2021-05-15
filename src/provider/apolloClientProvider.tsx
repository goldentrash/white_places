import React, { ReactElement } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ProviderProps } from './index';

const apolloClient = new ApolloClient({
  uri: '/.netlify/functions/graphql',

  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV !== 'production',

  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
      partialRefetch: true,
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export const ApolloClientProvider = ({
  children,
}: ProviderProps): ReactElement => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
