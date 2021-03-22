import { ApolloClient, NormalizedCacheObject} from '@apollo/client'

export type Context = {
  faunaClient: ApolloClient<NormalizedCacheObject>
}