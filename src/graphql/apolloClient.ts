import { ApolloClient, InMemoryCache, createHttpLink, from } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"

const httpLink = createHttpLink({
  // TODO: need to changed to PS beauty url. Specifies the URL of our GraphQL server. 
  uri: "https://userprofile-api.bigdatainn-dev.site"
})

const authLink = setContext((_, { headers }) => {
  // TODO: Need to changed PS beauty token.
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOnsidXNlcklkIjoxMywiYWNjb3VudCI6IndoaXRlIiwidmVuZG9yIjoiQ0xEIn0sImFsbG93ZWRWZW5kb3IiOlsiRE1PIiwiVUEyIiwiVUEzIiwiVUE0IiwiVUE1Il0sInNjb3BlcyI6W10sImV4cCI6MTY1MTEzNDc5Nn0.eDvtpIVhEgqtA6dYrhdN3dxvBjUSbS6v8DH_2FpF0yPfmobKEzcJ7afQLYyLR6XbgulgSZHV20c8YOh9AUMTyms10zYhtqel2h29yA3H7CLKMKkm7DtLj0WolPgxNpfC3BIv7hV6pZgA_YQEKJpurYYq3qp8aQYuThejo2mkSdh5tg_6pLfWrCrYcvOneW94AGHLnzeuUcHjrmGFGNDJrSKE89Sur4-xnXPGmxAI_vjenG2rNHNWF3xwT53vx1ikntg0bdfDqhFq2wdongn0j23iGvDD3EOFlrAsjjMC--CO0VLMFGPBkmhw8SYtZcyPkIwGNFm3pzQbz3-mJzC75lqj7fVrXydNHVN6RNbU6SnpzWUft4cj38LscHgBLYQ-bNAUJdHPXYQy4gTriWo5h0v-gkgPMBjLF6kVhqaGCj30Umx8mOUoAaq6gOgdnmu8ZPH2uQGXLL-kUq3Og6DrTf9mh2VY-451vVQtKiZ5Z1tksvZHizYyGMXIFl5ba_gyamBXRGm10oW99qL06IlYIOD7D1MFtAdadjDsU_D9dgW5hd2_f0cWLr8ST0AtbpBraOWii6hsvd1zIQMdCIxRk_f6cm5ugjpA1OoqNc06BBhDPhF0iA8UYl4TpP7RnBSzsEnSoZ9Klk3Fg3cwLxXnQpNqzRicihW58YXodyj9AEk"
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) console.log(`[Network error] ${networkError}`)
  if (graphQLErrors && Array.isArray(graphQLErrors)) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    })
  } else console.log(`[GraphQL error]: Message: ${graphQLErrors}`)
})

const apolloClient = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache({
    typePolicies: {},
  }),
})

export default apolloClient
