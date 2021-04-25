import React, { ReactElement, ReactNode } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: '/.netlify/functions/graphql',

  // 현재 캐싱을 전혀 활용하지 않고 있다.
  // 추후 공부를 통해 캐싱을 활용, state management에 사용하자
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV !== 'production',

  defaultOptions: {
    query: {
      // fetchPolicy: 'cache-first',
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
      partialRefetch: true,
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export const ApolloClientProvider = (props: {
  children: ReactNode;
}): ReactElement => {
  return (
    <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>
  );
};
