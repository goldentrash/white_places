import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/.netlify/functions/graphql',

  // 현재 캐싱을 전혀 활용하지 않고 있다.
  // 추후 공부를 통해 캐싱을 활용, state management에 사용하자
  cache: new InMemoryCache(),
  connectToDevTools: false,

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

export default client;
