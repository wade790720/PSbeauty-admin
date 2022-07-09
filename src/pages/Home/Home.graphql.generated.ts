import * as Types from "../../types/schema"

import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
const defaultOptions = {} as const
export type GetHomeQueryVariables = Types.Exact<{
  first: Types.InputMaybe<Types.Scalars["Int"]>
  orderId: Types.InputMaybe<Types.SortEnumType>
}>

export type GetHomeQuery = {
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
}

export type AddAdCardMutationVariables = Types.Exact<{
  image: Types.InputMaybe<Types.Scalars["String"]>
  title: Types.InputMaybe<Types.Scalars["String"]>
  content: Types.InputMaybe<Types.Scalars["String"]>
}>

export type AddAdCardMutation = {
  addAdCard: { __typename: "AddAdCardPayload"; id: string | null } | null
}

export type DeleteAdCardMutationVariables = Types.Exact<{
  id: Types.InputMaybe<Types.Scalars["String"]>
}>

export type DeleteAdCardMutation = {
  deleteAdCard: { __typename: "DeleteAdCardPayload"; id: string | null } | null
}

export const GetHomeDocument = gql`
  query GetHome($first: Int, $orderId: SortEnumType) {
    adCards(first: $first, order: { id: $orderId }) {
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
  }
`

/**
 * __useGetHomeQuery__
 *
 * To run a query within a React component, call `useGetHomeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHomeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHomeQuery({
 *   variables: {
 *      first: // value for 'first'
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useGetHomeQuery(
  baseOptions?: Apollo.QueryHookOptions<GetHomeQuery, GetHomeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetHomeQuery, GetHomeQueryVariables>(GetHomeDocument, options)
}
export function useGetHomeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetHomeQuery, GetHomeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetHomeQuery, GetHomeQueryVariables>(GetHomeDocument, options)
}
export type GetHomeQueryHookResult = ReturnType<typeof useGetHomeQuery>
export type GetHomeLazyQueryHookResult = ReturnType<typeof useGetHomeLazyQuery>
export type GetHomeQueryResult = Apollo.QueryResult<GetHomeQuery, GetHomeQueryVariables>
export const AddAdCardDocument = gql`
  mutation AddAdCard($image: String, $title: String, $content: String) {
    addAdCard(input: { image: $image, title: $title, content: $content }) {
      id
    }
  }
`
export type AddAdCardMutationFn = Apollo.MutationFunction<
  AddAdCardMutation,
  AddAdCardMutationVariables
>

/**
 * __useAddAdCardMutation__
 *
 * To run a mutation, you first call `useAddAdCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAdCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAdCardMutation, { data, loading, error }] = useAddAdCardMutation({
 *   variables: {
 *      image: // value for 'image'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useAddAdCardMutation(
  baseOptions?: Apollo.MutationHookOptions<AddAdCardMutation, AddAdCardMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddAdCardMutation, AddAdCardMutationVariables>(
    AddAdCardDocument,
    options,
  )
}
export type AddAdCardMutationHookResult = ReturnType<typeof useAddAdCardMutation>
export type AddAdCardMutationResult = Apollo.MutationResult<AddAdCardMutation>
export type AddAdCardMutationOptions = Apollo.BaseMutationOptions<
  AddAdCardMutation,
  AddAdCardMutationVariables
>
export const DeleteAdCardDocument = gql`
  mutation DeleteAdCard($id: String) {
    deleteAdCard(input: { id: $id }) {
      id
    }
  }
`
export type DeleteAdCardMutationFn = Apollo.MutationFunction<
  DeleteAdCardMutation,
  DeleteAdCardMutationVariables
>

/**
 * __useDeleteAdCardMutation__
 *
 * To run a mutation, you first call `useDeleteAdCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAdCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAdCardMutation, { data, loading, error }] = useDeleteAdCardMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAdCardMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteAdCardMutation, DeleteAdCardMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteAdCardMutation, DeleteAdCardMutationVariables>(
    DeleteAdCardDocument,
    options,
  )
}
export type DeleteAdCardMutationHookResult = ReturnType<typeof useDeleteAdCardMutation>
export type DeleteAdCardMutationResult = Apollo.MutationResult<DeleteAdCardMutation>
export type DeleteAdCardMutationOptions = Apollo.BaseMutationOptions<
  DeleteAdCardMutation,
  DeleteAdCardMutationVariables
>
