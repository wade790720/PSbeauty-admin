import * as Types from "../../types/schema"

import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
const defaultOptions = {} as const
export type GetCategoriesQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetCategoriesQuery = {
  topCategories: Array<{
    __typename: "TopCategory"
    name: string | null
    secondCategories: Array<{
      __typename: "SecondCategory"
      name: string | null
      categories: Array<{
        __typename: "Category"
        id: string | null
        name: string | null
        uniqueNumber: number
      } | null> | null
    } | null> | null
  } | null> | null
}

export const GetCategoriesDocument = gql`
  query GetCategories {
    topCategories {
      name
      secondCategories {
        name
        categories {
          id
          name
          uniqueNumber
        }
      }
    }
  }
`

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(
    GetCategoriesDocument,
    options,
  )
}
export function useGetCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(
    GetCategoriesDocument,
    options,
  )
}
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>
export type GetCategoriesQueryResult = Apollo.QueryResult<
  GetCategoriesQuery,
  GetCategoriesQueryVariables
>
