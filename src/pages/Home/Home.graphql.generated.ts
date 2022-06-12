import * as Types from "../../types/schema"

import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
const defaultOptions = {} as const
export type GetHomeQueryQueryVariables = Types.Exact<{
  adCardsFirst: Types.InputMaybe<Types.Scalars["Int"]>
  adCardsOrderId: Types.InputMaybe<Types.SortEnumType>
  adImagesFirst: Types.InputMaybe<Types.Scalars["Int"]>
  adImagesOrderId: Types.InputMaybe<Types.SortEnumType>
  adImagesWhere: Types.InputMaybe<Types.Scalars["String"]>
}>

export type GetHomeQueryQuery = {
  adCards: {
    __typename: "AdCardsConnection"
    pageInfo: {
      __typename: "PageInfo"
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor: string | null
      endCursor: string | null
    }
    edges: Array<{
      __typename: "AdCardsEdge"
      cursor: string
      node: {
        __typename: "AdCard"
        id: string | null
        image: string | null
        title: string | null
        content: string | null
      } | null
    }> | null
  } | null
  adImages: {
    __typename: "AdImagesConnection"
    pageInfo: {
      __typename: "PageInfo"
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor: string | null
      endCursor: string | null
    }
    edges: Array<{
      __typename: "AdImagesEdge"
      cursor: string
      node: {
        __typename: "AdImage"
        id: string | null
        image: string | null
        sort: number
        usageType: string | null
        redirectType: string | null
        targetId: string | null
      } | null
    }> | null
  } | null
}

export const GetHomeQueryDocument = gql`
  query GetHomeQuery(
    $adCardsFirst: Int
    $adCardsOrderId: SortEnumType
    $adImagesFirst: Int
    $adImagesOrderId: SortEnumType
    $adImagesWhere: String
  ) {
    adCards(first: $adCardsFirst, order: { id: $adCardsOrderId }) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          image
          title
          content
        }
      }
    }
    adImages(
      where: { usageType: { eq: $adImagesWhere } }
      order: { id: $adImagesOrderId }
      first: $adImagesFirst
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          image
          sort
          usageType
          redirectType
          targetId
        }
      }
    }
  }
`

/**
 * __useGetHomeQueryQuery__
 *
 * To run a query within a React component, call `useGetHomeQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHomeQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHomeQueryQuery({
 *   variables: {
 *      adCardsFirst: // value for 'adCardsFirst'
 *      adCardsOrderId: // value for 'adCardsOrderId'
 *      adImagesFirst: // value for 'adImagesFirst'
 *      adImagesOrderId: // value for 'adImagesOrderId'
 *      adImagesWhere: // value for 'adImagesWhere'
 *   },
 * });
 */
export function useGetHomeQueryQuery(
  baseOptions?: Apollo.QueryHookOptions<GetHomeQueryQuery, GetHomeQueryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetHomeQueryQuery, GetHomeQueryQueryVariables>(
    GetHomeQueryDocument,
    options,
  )
}
export function useGetHomeQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetHomeQueryQuery, GetHomeQueryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetHomeQueryQuery, GetHomeQueryQueryVariables>(
    GetHomeQueryDocument,
    options,
  )
}
export type GetHomeQueryQueryHookResult = ReturnType<typeof useGetHomeQueryQuery>
export type GetHomeQueryLazyQueryHookResult = ReturnType<typeof useGetHomeQueryLazyQuery>
export type GetHomeQueryQueryResult = Apollo.QueryResult<
  GetHomeQueryQuery,
  GetHomeQueryQueryVariables
>
