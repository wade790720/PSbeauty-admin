import * as Types from "../../types/schema"

import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
const defaultOptions = {} as const
export type GetSettingQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetSettingQuery = {
  popularKeywords: { __typename: "PopularKeywords"; keywords: Array<string | null> | null } | null
  users: {
    __typename: "UsersConnection"
    pageInfo: {
      __typename: "PageInfo"
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor: string | null
      endCursor: string | null
    }
    edges: Array<{
      __typename: "UsersEdge"
      cursor: string
      node: {
        __typename: "User"
        id: string | null
        name: string | null
        email: string | null
      } | null
    }> | null
  } | null
}

export type AddKeywordMutationVariables = Types.Exact<{
  keyword: Types.InputMaybe<Types.Scalars["String"]>
}>

export type AddKeywordMutation = {
  addPopularKeyword: { __typename: "AddPopularKeywordPayload"; keyword: string | null } | null
}

export type DeleteKeywordMutationVariables = Types.Exact<{
  keyword: Types.InputMaybe<Types.Scalars["String"]>
}>

export type DeleteKeywordMutation = {
  deletePopularKeyword: { __typename: "DeletePopularKeywordPayload"; keyword: string | null } | null
}

export type DeleteMemberMutationVariables = Types.Exact<{
  id: Types.InputMaybe<Types.Scalars["String"]>
}>

export type DeleteMemberMutation = {
  deleteUser: { __typename: "DeleteUserPayload"; id: string | null } | null
}

export const GetSettingDocument = gql`
  query GetSetting {
    popularKeywords {
      keywords
    }
    users {
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
          name
          email
        }
      }
    }
  }
`

/**
 * __useGetSettingQuery__
 *
 * To run a query within a React component, call `useGetSettingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSettingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSettingQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSettingQuery(
  baseOptions?: Apollo.QueryHookOptions<GetSettingQuery, GetSettingQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetSettingQuery, GetSettingQueryVariables>(GetSettingDocument, options)
}
export function useGetSettingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetSettingQuery, GetSettingQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetSettingQuery, GetSettingQueryVariables>(GetSettingDocument, options)
}
export type GetSettingQueryHookResult = ReturnType<typeof useGetSettingQuery>
export type GetSettingLazyQueryHookResult = ReturnType<typeof useGetSettingLazyQuery>
export type GetSettingQueryResult = Apollo.QueryResult<GetSettingQuery, GetSettingQueryVariables>
export const AddKeywordDocument = gql`
  mutation AddKeyword($keyword: String) {
    addPopularKeyword(input: { keyword: $keyword }) {
      keyword
    }
  }
`
export type AddKeywordMutationFn = Apollo.MutationFunction<
  AddKeywordMutation,
  AddKeywordMutationVariables
>

/**
 * __useAddKeywordMutation__
 *
 * To run a mutation, you first call `useAddKeywordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddKeywordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addKeywordMutation, { data, loading, error }] = useAddKeywordMutation({
 *   variables: {
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useAddKeywordMutation(
  baseOptions?: Apollo.MutationHookOptions<AddKeywordMutation, AddKeywordMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddKeywordMutation, AddKeywordMutationVariables>(
    AddKeywordDocument,
    options,
  )
}
export type AddKeywordMutationHookResult = ReturnType<typeof useAddKeywordMutation>
export type AddKeywordMutationResult = Apollo.MutationResult<AddKeywordMutation>
export type AddKeywordMutationOptions = Apollo.BaseMutationOptions<
  AddKeywordMutation,
  AddKeywordMutationVariables
>
export const DeleteKeywordDocument = gql`
  mutation DeleteKeyword($keyword: String) {
    deletePopularKeyword(input: { keyword: $keyword }) {
      keyword
    }
  }
`
export type DeleteKeywordMutationFn = Apollo.MutationFunction<
  DeleteKeywordMutation,
  DeleteKeywordMutationVariables
>

/**
 * __useDeleteKeywordMutation__
 *
 * To run a mutation, you first call `useDeleteKeywordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteKeywordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteKeywordMutation, { data, loading, error }] = useDeleteKeywordMutation({
 *   variables: {
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useDeleteKeywordMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteKeywordMutation, DeleteKeywordMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteKeywordMutation, DeleteKeywordMutationVariables>(
    DeleteKeywordDocument,
    options,
  )
}
export type DeleteKeywordMutationHookResult = ReturnType<typeof useDeleteKeywordMutation>
export type DeleteKeywordMutationResult = Apollo.MutationResult<DeleteKeywordMutation>
export type DeleteKeywordMutationOptions = Apollo.BaseMutationOptions<
  DeleteKeywordMutation,
  DeleteKeywordMutationVariables
>
export const DeleteMemberDocument = gql`
  mutation DeleteMember($id: String) {
    deleteUser(input: { id: $id }) {
      id
    }
  }
`
export type DeleteMemberMutationFn = Apollo.MutationFunction<
  DeleteMemberMutation,
  DeleteMemberMutationVariables
>

/**
 * __useDeleteMemberMutation__
 *
 * To run a mutation, you first call `useDeleteMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMemberMutation, { data, loading, error }] = useDeleteMemberMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteMemberMutation, DeleteMemberMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteMemberMutation, DeleteMemberMutationVariables>(
    DeleteMemberDocument,
    options,
  )
}
export type DeleteMemberMutationHookResult = ReturnType<typeof useDeleteMemberMutation>
export type DeleteMemberMutationResult = Apollo.MutationResult<DeleteMemberMutation>
export type DeleteMemberMutationOptions = Apollo.BaseMutationOptions<
  DeleteMemberMutation,
  DeleteMemberMutationVariables
>
