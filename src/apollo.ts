import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/.netlify/functions/graphql',
  cache: new InMemoryCache(),
});

export default client;
