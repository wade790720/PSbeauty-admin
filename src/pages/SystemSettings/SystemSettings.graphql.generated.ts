import * as Types from "../../types/schema"

import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
const defaultOptions = {} as const
export type GetSettingQueryVariables = Types.Exact<{
  after: Types.InputMaybe<Types.Scalars["String"]>
}>

export type GetSettingQuery = {
  popularKeywords: { __typename: "PopularKeywords"; keywords: Array<string | null> | null } | null
  users: {
    __typename: "UsersConnection"
    totalCount: number
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

export type GetMemberQueryVariables = Types.Exact<{
  after: Types.InputMaybe<Types.Scalars["String"]>
}>

export type GetMemberQuery = {
  users: {
    __typename: "UsersConnection"
    totalCount: number
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

export type GetCategoriesQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetCategoriesQuery = {
  topCategories: Array<{
    __typename: "TopCategory"
    id: string | null
    name: string | null
    sort: number
    secondCategories: Array<{
      __typename: "SecondCategory"
      id: string | null
      name: string | null
      sort: number
      categories: Array<{
        __typename: "Category"
        id: string | null
        name: string | null
        sort: number
      } | null> | null
    } | null> | null
  } | null> | null
}

export type AddKeywordMutationVariables = Types.Exact<{
  keyword: Types.InputMaybe<Types.Scalars["String"]>
}>

export type AddKeywordMutation = {
  addPopularKeyword: { __typename: "AddPopularKeywordPayload"; keyword: string | null } | null
}

export type AddTopCategoryMutationVariables = Types.Exact<{
  name: Types.InputMaybe<Types.Scalars["String"]>
}>

export type AddTopCategoryMutation = {
  addTopCategory: { __typename: "AddTopCategoryPayload"; id: string | null } | null
}

export type AddSecondCategoryMutationVariables = Types.Exact<{
  name: Types.InputMaybe<Types.Scalars["String"]>
  topCategoryId: Types.InputMaybe<Types.Scalars["String"]>
}>

export type AddSecondCategoryMutation = {
  addSecondCategory: { __typename: "AddSecondCategoryPayload"; id: string | null } | null
}

export type AddCategoryMutationVariables = Types.Exact<{
  name: Types.InputMaybe<Types.Scalars["String"]>
  topCategoryId: Types.InputMaybe<Types.Scalars["String"]>
  secondCategoryId: Types.InputMaybe<Types.Scalars["String"]>
}>

export type AddCategoryMutation = {
  addCategory: { __typename: "AddCategoryPayload"; id: string | null } | null
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

export type DeleteTopCategoryMutationVariables = Types.Exact<{
  id: Types.InputMaybe<Types.Scalars["String"]>
}>

export type DeleteTopCategoryMutation = {
  deleteTopCategory: { __typename: "DeleteTopCategoryPayload"; id: string | null } | null
}

export type DeleteSecondCategoryMutationVariables = Types.Exact<{
  id: Types.InputMaybe<Types.Scalars["String"]>
}>

export type DeleteSecondCategoryMutation = {
  deleteSecondCategory: { __typename: "DeleteSecondCategoryPayload"; id: string | null } | null
}

export type DeleteCategoryMutationVariables = Types.Exact<{
  id: Types.InputMaybe<Types.Scalars["String"]>
}>

export type DeleteCategoryMutation = {
  deleteCategory: { __typename: "DeleteCategoryPayload"; id: string | null } | null
}

export type SetTopCategoryOrderMutationVariables = Types.Exact<{
  sorted: Types.InputMaybe<
    Array<Types.InputMaybe<Types.Scalars["String"]>> | Types.InputMaybe<Types.Scalars["String"]>
  >
}>

export type SetTopCategoryOrderMutation = {
  setTopCategoryOrder: {
    __typename: "SetTopCategoryOrderPayload"
    topCategories: Array<{
      __typename: "TopCategory"
      id: string | null
      name: string | null
      sort: number
    } | null> | null
  } | null
}

export type SetSecondCategoryOrderMutationVariables = Types.Exact<{
  sorted: Types.InputMaybe<
    Array<Types.InputMaybe<Types.Scalars["String"]>> | Types.InputMaybe<Types.Scalars["String"]>
  >
  topCategoryId: Types.InputMaybe<Types.Scalars["String"]>
}>

export type SetSecondCategoryOrderMutation = {
  setSecondCategoryOrder: {
    __typename: "SetSecondCategoryOrderPayload"
    secondCategories: Array<{
      __typename: "SecondCategory"
      id: string | null
      name: string | null
      sort: number
    } | null> | null
  } | null
}

export type SetCategoryOrderMutationVariables = Types.Exact<{
  sorted: Types.InputMaybe<
    Array<Types.InputMaybe<Types.Scalars["String"]>> | Types.InputMaybe<Types.Scalars["String"]>
  >
  secondCategoryId: Types.InputMaybe<Types.Scalars["String"]>
}>

export type SetCategoryOrderMutation = {
  setCategoryOrder: {
    __typename: "SetCategoryOrderPayload"
    categories: Array<{
      __typename: "Category"
      id: string | null
      name: string | null
      sort: number
    } | null> | null
  } | null
}

export type SetPopularKeywordsMutationVariables = Types.Exact<{
  keywords: Types.InputMaybe<
    Array<Types.InputMaybe<Types.Scalars["String"]>> | Types.InputMaybe<Types.Scalars["String"]>
  >
}>

export type SetPopularKeywordsMutation = {
  setPopularKeywords: {
    __typename: "SetPopularKeywordsPayload"
    keywords: Array<string | null> | null
  } | null
}

export const GetSettingDocument = gql`
  query GetSetting($after: String) {
    popularKeywords {
      keywords
    }
    users(first: 10, after: $after) {
      totalCount
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
 *      after: // value for 'after'
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
export const GetMemberDocument = gql`
  query GetMember($after: String) {
    users(first: 10, after: $after) {
      totalCount
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
 * __useGetMemberQuery__
 *
 * To run a query within a React component, call `useGetMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberQuery({
 *   variables: {
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetMemberQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMemberQuery, GetMemberQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMemberQuery, GetMemberQueryVariables>(GetMemberDocument, options)
}
export function useGetMemberLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMemberQuery, GetMemberQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMemberQuery, GetMemberQueryVariables>(GetMemberDocument, options)
}
export type GetMemberQueryHookResult = ReturnType<typeof useGetMemberQuery>
export type GetMemberLazyQueryHookResult = ReturnType<typeof useGetMemberLazyQuery>
export type GetMemberQueryResult = Apollo.QueryResult<GetMemberQuery, GetMemberQueryVariables>
export const GetCategoriesDocument = gql`
  query GetCategories {
    topCategories {
      id
      name
      sort
      secondCategories {
        id
        name
        sort
        categories {
          id
          name
          sort
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
export const AddTopCategoryDocument = gql`
  mutation AddTopCategory($name: String) {
    addTopCategory(input: { name: $name }) {
      id
    }
  }
`
export type AddTopCategoryMutationFn = Apollo.MutationFunction<
  AddTopCategoryMutation,
  AddTopCategoryMutationVariables
>

/**
 * __useAddTopCategoryMutation__
 *
 * To run a mutation, you first call `useAddTopCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTopCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTopCategoryMutation, { data, loading, error }] = useAddTopCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddTopCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<AddTopCategoryMutation, AddTopCategoryMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddTopCategoryMutation, AddTopCategoryMutationVariables>(
    AddTopCategoryDocument,
    options,
  )
}
export type AddTopCategoryMutationHookResult = ReturnType<typeof useAddTopCategoryMutation>
export type AddTopCategoryMutationResult = Apollo.MutationResult<AddTopCategoryMutation>
export type AddTopCategoryMutationOptions = Apollo.BaseMutationOptions<
  AddTopCategoryMutation,
  AddTopCategoryMutationVariables
>
export const AddSecondCategoryDocument = gql`
  mutation AddSecondCategory($name: String, $topCategoryId: String) {
    addSecondCategory(input: { name: $name, topCategoryId: $topCategoryId }) {
      id
    }
  }
`
export type AddSecondCategoryMutationFn = Apollo.MutationFunction<
  AddSecondCategoryMutation,
  AddSecondCategoryMutationVariables
>

/**
 * __useAddSecondCategoryMutation__
 *
 * To run a mutation, you first call `useAddSecondCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSecondCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSecondCategoryMutation, { data, loading, error }] = useAddSecondCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *      topCategoryId: // value for 'topCategoryId'
 *   },
 * });
 */
export function useAddSecondCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddSecondCategoryMutation,
    AddSecondCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddSecondCategoryMutation, AddSecondCategoryMutationVariables>(
    AddSecondCategoryDocument,
    options,
  )
}
export type AddSecondCategoryMutationHookResult = ReturnType<typeof useAddSecondCategoryMutation>
export type AddSecondCategoryMutationResult = Apollo.MutationResult<AddSecondCategoryMutation>
export type AddSecondCategoryMutationOptions = Apollo.BaseMutationOptions<
  AddSecondCategoryMutation,
  AddSecondCategoryMutationVariables
>
export const AddCategoryDocument = gql`
  mutation AddCategory($name: String, $topCategoryId: String, $secondCategoryId: String) {
    addCategory(
      input: { name: $name, topCategoryId: $topCategoryId, secondCategoryId: $secondCategoryId }
    ) {
      id
    }
  }
`
export type AddCategoryMutationFn = Apollo.MutationFunction<
  AddCategoryMutation,
  AddCategoryMutationVariables
>

/**
 * __useAddCategoryMutation__
 *
 * To run a mutation, you first call `useAddCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCategoryMutation, { data, loading, error }] = useAddCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *      topCategoryId: // value for 'topCategoryId'
 *      secondCategoryId: // value for 'secondCategoryId'
 *   },
 * });
 */
export function useAddCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<AddCategoryMutation, AddCategoryMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddCategoryMutation, AddCategoryMutationVariables>(
    AddCategoryDocument,
    options,
  )
}
export type AddCategoryMutationHookResult = ReturnType<typeof useAddCategoryMutation>
export type AddCategoryMutationResult = Apollo.MutationResult<AddCategoryMutation>
export type AddCategoryMutationOptions = Apollo.BaseMutationOptions<
  AddCategoryMutation,
  AddCategoryMutationVariables
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
export const DeleteTopCategoryDocument = gql`
  mutation DeleteTopCategory($id: String) {
    deleteTopCategory(input: { id: $id }) {
      id
    }
  }
`
export type DeleteTopCategoryMutationFn = Apollo.MutationFunction<
  DeleteTopCategoryMutation,
  DeleteTopCategoryMutationVariables
>

/**
 * __useDeleteTopCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteTopCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTopCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTopCategoryMutation, { data, loading, error }] = useDeleteTopCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTopCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteTopCategoryMutation,
    DeleteTopCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteTopCategoryMutation, DeleteTopCategoryMutationVariables>(
    DeleteTopCategoryDocument,
    options,
  )
}
export type DeleteTopCategoryMutationHookResult = ReturnType<typeof useDeleteTopCategoryMutation>
export type DeleteTopCategoryMutationResult = Apollo.MutationResult<DeleteTopCategoryMutation>
export type DeleteTopCategoryMutationOptions = Apollo.BaseMutationOptions<
  DeleteTopCategoryMutation,
  DeleteTopCategoryMutationVariables
>
export const DeleteSecondCategoryDocument = gql`
  mutation DeleteSecondCategory($id: String) {
    deleteSecondCategory(input: { id: $id }) {
      id
    }
  }
`
export type DeleteSecondCategoryMutationFn = Apollo.MutationFunction<
  DeleteSecondCategoryMutation,
  DeleteSecondCategoryMutationVariables
>

/**
 * __useDeleteSecondCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteSecondCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSecondCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSecondCategoryMutation, { data, loading, error }] = useDeleteSecondCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSecondCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteSecondCategoryMutation,
    DeleteSecondCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteSecondCategoryMutation, DeleteSecondCategoryMutationVariables>(
    DeleteSecondCategoryDocument,
    options,
  )
}
export type DeleteSecondCategoryMutationHookResult = ReturnType<
  typeof useDeleteSecondCategoryMutation
>
export type DeleteSecondCategoryMutationResult = Apollo.MutationResult<DeleteSecondCategoryMutation>
export type DeleteSecondCategoryMutationOptions = Apollo.BaseMutationOptions<
  DeleteSecondCategoryMutation,
  DeleteSecondCategoryMutationVariables
>
export const DeleteCategoryDocument = gql`
  mutation DeleteCategory($id: String) {
    deleteCategory(input: { id: $id }) {
      id
    }
  }
`
export type DeleteCategoryMutationFn = Apollo.MutationFunction<
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables
>

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(
    DeleteCategoryDocument,
    options,
  )
}
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables
>
export const SetTopCategoryOrderDocument = gql`
  mutation SetTopCategoryOrder($sorted: [String]) {
    setTopCategoryOrder(input: { sorted: $sorted }) {
      topCategories {
        id
        name
        sort
      }
    }
  }
`
export type SetTopCategoryOrderMutationFn = Apollo.MutationFunction<
  SetTopCategoryOrderMutation,
  SetTopCategoryOrderMutationVariables
>

/**
 * __useSetTopCategoryOrderMutation__
 *
 * To run a mutation, you first call `useSetTopCategoryOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTopCategoryOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTopCategoryOrderMutation, { data, loading, error }] = useSetTopCategoryOrderMutation({
 *   variables: {
 *      sorted: // value for 'sorted'
 *   },
 * });
 */
export function useSetTopCategoryOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetTopCategoryOrderMutation,
    SetTopCategoryOrderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SetTopCategoryOrderMutation, SetTopCategoryOrderMutationVariables>(
    SetTopCategoryOrderDocument,
    options,
  )
}
export type SetTopCategoryOrderMutationHookResult = ReturnType<
  typeof useSetTopCategoryOrderMutation
>
export type SetTopCategoryOrderMutationResult = Apollo.MutationResult<SetTopCategoryOrderMutation>
export type SetTopCategoryOrderMutationOptions = Apollo.BaseMutationOptions<
  SetTopCategoryOrderMutation,
  SetTopCategoryOrderMutationVariables
>
export const SetSecondCategoryOrderDocument = gql`
  mutation SetSecondCategoryOrder($sorted: [String], $topCategoryId: String) {
    setSecondCategoryOrder(input: { sorted: $sorted, topCategoryId: $topCategoryId }) {
      secondCategories {
        id
        name
        sort
      }
    }
  }
`
export type SetSecondCategoryOrderMutationFn = Apollo.MutationFunction<
  SetSecondCategoryOrderMutation,
  SetSecondCategoryOrderMutationVariables
>

/**
 * __useSetSecondCategoryOrderMutation__
 *
 * To run a mutation, you first call `useSetSecondCategoryOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetSecondCategoryOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setSecondCategoryOrderMutation, { data, loading, error }] = useSetSecondCategoryOrderMutation({
 *   variables: {
 *      sorted: // value for 'sorted'
 *      topCategoryId: // value for 'topCategoryId'
 *   },
 * });
 */
export function useSetSecondCategoryOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetSecondCategoryOrderMutation,
    SetSecondCategoryOrderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    SetSecondCategoryOrderMutation,
    SetSecondCategoryOrderMutationVariables
  >(SetSecondCategoryOrderDocument, options)
}
export type SetSecondCategoryOrderMutationHookResult = ReturnType<
  typeof useSetSecondCategoryOrderMutation
>
export type SetSecondCategoryOrderMutationResult =
  Apollo.MutationResult<SetSecondCategoryOrderMutation>
export type SetSecondCategoryOrderMutationOptions = Apollo.BaseMutationOptions<
  SetSecondCategoryOrderMutation,
  SetSecondCategoryOrderMutationVariables
>
export const SetCategoryOrderDocument = gql`
  mutation SetCategoryOrder($sorted: [String], $secondCategoryId: String) {
    setCategoryOrder(input: { sorted: $sorted, secondCategoryId: $secondCategoryId }) {
      categories {
        id
        name
        sort
      }
    }
  }
`
export type SetCategoryOrderMutationFn = Apollo.MutationFunction<
  SetCategoryOrderMutation,
  SetCategoryOrderMutationVariables
>

/**
 * __useSetCategoryOrderMutation__
 *
 * To run a mutation, you first call `useSetCategoryOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetCategoryOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setCategoryOrderMutation, { data, loading, error }] = useSetCategoryOrderMutation({
 *   variables: {
 *      sorted: // value for 'sorted'
 *      secondCategoryId: // value for 'secondCategoryId'
 *   },
 * });
 */
export function useSetCategoryOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetCategoryOrderMutation,
    SetCategoryOrderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SetCategoryOrderMutation, SetCategoryOrderMutationVariables>(
    SetCategoryOrderDocument,
    options,
  )
}
export type SetCategoryOrderMutationHookResult = ReturnType<typeof useSetCategoryOrderMutation>
export type SetCategoryOrderMutationResult = Apollo.MutationResult<SetCategoryOrderMutation>
export type SetCategoryOrderMutationOptions = Apollo.BaseMutationOptions<
  SetCategoryOrderMutation,
  SetCategoryOrderMutationVariables
>
export const SetPopularKeywordsDocument = gql`
  mutation SetPopularKeywords($keywords: [String]) {
    setPopularKeywords(input: { keywords: $keywords }) {
      keywords
    }
  }
`
export type SetPopularKeywordsMutationFn = Apollo.MutationFunction<
  SetPopularKeywordsMutation,
  SetPopularKeywordsMutationVariables
>

/**
 * __useSetPopularKeywordsMutation__
 *
 * To run a mutation, you first call `useSetPopularKeywordsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPopularKeywordsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPopularKeywordsMutation, { data, loading, error }] = useSetPopularKeywordsMutation({
 *   variables: {
 *      keywords: // value for 'keywords'
 *   },
 * });
 */
export function useSetPopularKeywordsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetPopularKeywordsMutation,
    SetPopularKeywordsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SetPopularKeywordsMutation, SetPopularKeywordsMutationVariables>(
    SetPopularKeywordsDocument,
    options,
  )
}
export type SetPopularKeywordsMutationHookResult = ReturnType<typeof useSetPopularKeywordsMutation>
export type SetPopularKeywordsMutationResult = Apollo.MutationResult<SetPopularKeywordsMutation>
export type SetPopularKeywordsMutationOptions = Apollo.BaseMutationOptions<
  SetPopularKeywordsMutation,
  SetPopularKeywordsMutationVariables
>
