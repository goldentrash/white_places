import { ApolloClient, InMemoryCache } from '@apollo/client';

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

export default apolloClient;
