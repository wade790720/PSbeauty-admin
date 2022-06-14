import { ApolloClient, InMemoryCache, createHttpLink, from, ServerError } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"
import { getStorageValue, removeStorageValue } from "hooks/useLocalStorage"

const httpLink = createHttpLink({
  uri: "https://cloud-run-api-psbeauty-deuedjpwuq-de.a.run.app/api/graphql",
})

const authLink = setContext((_, { headers }) => {
  const token = getStorageValue("token", "")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) {
    if ((networkError as ServerError).statusCode === 401) {
      removeStorageValue("token")
      location.reload()
    } else console.log(`[Network error] ${networkError}`)
  }
  if (graphQLErrors && Array.isArray(graphQLErrors)) {
    // eslint-disable-next-line array-callback-return
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    })
  } else console.log(`[GraphQL error]: Message: ${graphQLErrors}`)
})

const apolloClient = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache({}),
})

export default apolloClient
