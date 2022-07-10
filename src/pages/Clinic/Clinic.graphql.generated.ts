import * as Types from "../../types/schema"

import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
const defaultOptions = {} as const
export type GetClinicQueryVariables = Types.Exact<{
  first: Types.InputMaybe<Types.Scalars["Int"]>
  orderId: Types.InputMaybe<Types.SortEnumType>
}>

export type GetClinicQuery = {
  clinics: {
    __typename: "ClinicsConnection"
    totalCount: number
    pageInfo: {
      __typename: "PageInfo"
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor: string | null
      endCursor: string | null
    }
    edges: Array<{
      __typename: "ClinicsEdge"
      cursor: string
      node: {
        __typename: "Clinic"
        consultReplyCount: number
        caseCount: number
        county: string | null
        town: string | null
        address: string | null
        name: string | null
        id: string | null
      } | null
    }> | null
  } | null
}

export type AddClinicMutationVariables = Types.Exact<{
  name: Types.InputMaybe<Types.Scalars["String"]>
  categories: Types.InputMaybe<
    Array<Types.InputMaybe<Types.Scalars["String"]>> | Types.InputMaybe<Types.Scalars["String"]>
  >
  county: Types.InputMaybe<Types.Scalars["String"]>
  town: Types.InputMaybe<Types.Scalars["String"]>
  address: Types.InputMaybe<Types.Scalars["String"]>
  description: Types.InputMaybe<Types.Scalars["String"]>
  phone: Types.InputMaybe<Types.Scalars["String"]>
  web: Types.InputMaybe<Types.Scalars["String"]>
}>

export type AddClinicMutation = {
  addClinic: { __typename: "AddClinicPayload"; id: string | null } | null
}

export type DeleteClinicMutationVariables = Types.Exact<{
  id: Types.InputMaybe<Types.Scalars["String"]>
}>

export type DeleteClinicMutation = {
  deleteClinic: { __typename: "DeleteClinicPayload"; id: string | null } | null
}

export const GetClinicDocument = gql`
  query GetClinic($first: Int, $orderId: SortEnumType) {
    clinics(order: { id: $orderId }, first: $first) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          consultReplyCount
          caseCount
          county
          town
          address
          name
          id
        }
      }
    }
  }
`

/**
 * __useGetClinicQuery__
 *
 * To run a query within a React component, call `useGetClinicQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClinicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClinicQuery({
 *   variables: {
 *      first: // value for 'first'
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useGetClinicQuery(
  baseOptions?: Apollo.QueryHookOptions<GetClinicQuery, GetClinicQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetClinicQuery, GetClinicQueryVariables>(GetClinicDocument, options)
}
export function useGetClinicLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetClinicQuery, GetClinicQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetClinicQuery, GetClinicQueryVariables>(GetClinicDocument, options)
}
export type GetClinicQueryHookResult = ReturnType<typeof useGetClinicQuery>
export type GetClinicLazyQueryHookResult = ReturnType<typeof useGetClinicLazyQuery>
export type GetClinicQueryResult = Apollo.QueryResult<GetClinicQuery, GetClinicQueryVariables>
export const AddClinicDocument = gql`
  mutation AddClinic(
    $name: String
    $categories: [String]
    $county: String
    $town: String
    $address: String
    $description: String
    $phone: String
    $web: String
  ) {
    addClinic(
      input: {
        name: $name
        categories: $categories
        county: $county
        town: $town
        address: $address
        description: $description
        phone: $phone
        web: $web
      }
    ) {
      id
    }
  }
`
export type AddClinicMutationFn = Apollo.MutationFunction<
  AddClinicMutation,
  AddClinicMutationVariables
>

/**
 * __useAddClinicMutation__
 *
 * To run a mutation, you first call `useAddClinicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddClinicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addClinicMutation, { data, loading, error }] = useAddClinicMutation({
 *   variables: {
 *      name: // value for 'name'
 *      categories: // value for 'categories'
 *      county: // value for 'county'
 *      town: // value for 'town'
 *      address: // value for 'address'
 *      description: // value for 'description'
 *      phone: // value for 'phone'
 *      web: // value for 'web'
 *   },
 * });
 */
export function useAddClinicMutation(
  baseOptions?: Apollo.MutationHookOptions<AddClinicMutation, AddClinicMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddClinicMutation, AddClinicMutationVariables>(
    AddClinicDocument,
    options,
  )
}
export type AddClinicMutationHookResult = ReturnType<typeof useAddClinicMutation>
export type AddClinicMutationResult = Apollo.MutationResult<AddClinicMutation>
export type AddClinicMutationOptions = Apollo.BaseMutationOptions<
  AddClinicMutation,
  AddClinicMutationVariables
>
export const DeleteClinicDocument = gql`
  mutation DeleteClinic($id: String) {
    deleteClinic(input: { id: $id }) {
      id
    }
  }
`
export type DeleteClinicMutationFn = Apollo.MutationFunction<
  DeleteClinicMutation,
  DeleteClinicMutationVariables
>

/**
 * __useDeleteClinicMutation__
 *
 * To run a mutation, you first call `useDeleteClinicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClinicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClinicMutation, { data, loading, error }] = useDeleteClinicMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClinicMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteClinicMutation, DeleteClinicMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteClinicMutation, DeleteClinicMutationVariables>(
    DeleteClinicDocument,
    options,
  )
}
export type DeleteClinicMutationHookResult = ReturnType<typeof useDeleteClinicMutation>
export type DeleteClinicMutationResult = Apollo.MutationResult<DeleteClinicMutation>
export type DeleteClinicMutationOptions = Apollo.BaseMutationOptions<
  DeleteClinicMutation,
  DeleteClinicMutationVariables
>
