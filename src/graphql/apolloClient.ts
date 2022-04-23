import { ApolloClient, InMemoryCache, createHttpLink, from } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"

const httpLink = createHttpLink({
  // todo: specifies the URL of our GraphQL server. 
  uri: "https://userprofile-api.bigdatainn-dev.site"
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
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
