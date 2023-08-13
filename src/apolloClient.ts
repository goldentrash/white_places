import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from '@apollo/client';
import goTrue from 'src/goTrue';

const httpLink = new HttpLink({
  uri: '/.netlify/functions/graphql',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const goTrueUser = goTrue.currentUser();
  const jwt = goTrueUser?.token.access_token;

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: jwt ? `Bearer ${jwt}` : undefined,
    },
  }));

  return forward(operation);
});

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),

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
