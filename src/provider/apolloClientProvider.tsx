import React, { ReactElement, ReactNode } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

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

export type ApolloClientProviderProps = {
  children: ReactNode;
};
export const ApolloClientProvider = ({
  children,
}: ApolloClientProviderProps): ReactElement => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
export default ApolloClientProvider;
