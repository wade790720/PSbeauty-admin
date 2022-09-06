import jwt_decode from "jwt-decode"
import { ApolloClient, InMemoryCache, createHttpLink, from, ServerError } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"
import { getStorageValue, setStorageValue, removeStorageValue } from "hooks/useLocalStorage"
import { GetRefreshTokenDocument } from "graphql/queries/getRefreshToken.graphql.generated"

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

export const refreshToken = async () => {
  const customToken = getStorageValue("token", "")
  if (customToken) {
    const payload: { exp: number; iat: number } = jwt_decode(customToken)
    const expiredTime = new Date(payload.exp * 1000)
    const renewTime = new Date((payload.iat + ((payload.exp - payload.iat) * 5) / 10) * 1000)
    if (new Date() >= expiredTime) {
      // token expired (do nothing)
    } else if (new Date() >= renewTime) {
      try {
        const res = await apolloClient.query({
          query: GetRefreshTokenDocument,
          fetchPolicy: "no-cache",
        })
        const newCustomToken = res.data.refreshToken?.customToken
        if (newCustomToken) {
          setStorageValue("token", newCustomToken)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
refreshToken()
setInterval(() => {
  refreshToken()
}, 10 * 1000) // every 10 seconds check again

export default apolloClient
