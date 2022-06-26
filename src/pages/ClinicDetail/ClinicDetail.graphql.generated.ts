import * as Types from "../../types/schema"

import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
const defaultOptions = {} as const
export type GetClinicQueryVariables = Types.Exact<{
  id: Types.InputMaybe<Types.Scalars["String"]>
}>

export type GetClinicQuery = {
  clinic: {
    __typename: "Clinic"
    id: string | null
    name: string | null
    phone: string | null
    county: string | null
    town: string | null
    address: string | null
    web: string | null
    description: string | null
    categories: Array<{
      __typename: "Category"
      id: string | null
      name: string | null
    } | null> | null
  } | null
}

export type UpdateClinicMutationVariables = Types.Exact<{
  id: Types.InputMaybe<Types.Scalars["String"]>
  name: Types.InputMaybe<Types.Scalars["String"]>
  phone: Types.InputMaybe<Types.Scalars["String"]>
  county: Types.InputMaybe<Types.Scalars["String"]>
  town: Types.InputMaybe<Types.Scalars["String"]>
  address: Types.InputMaybe<Types.Scalars["String"]>
  web: Types.InputMaybe<Types.Scalars["String"]>
  description: Types.InputMaybe<Types.Scalars["String"]>
  categories: Types.InputMaybe<
    Array<Types.InputMaybe<Types.Scalars["String"]>> | Types.InputMaybe<Types.Scalars["String"]>
  >
}>

export type UpdateClinicMutation = {
  updateClinic: { __typename: "UpdateClinicPayload"; id: string | null } | null
}

export const GetClinicDocument = gql`
  query GetClinic($id: String) {
    clinic(id: $id) {
      id
      name
      phone
      county
      town
      address
      web
      description
      categories {
        id
        name
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
 *      id: // value for 'id'
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
export const UpdateClinicDocument = gql`
  mutation UpdateClinic(
    $id: String
    $name: String
    $phone: String
    $county: String
    $town: String
    $address: String
    $web: String
    $description: String
    $categories: [String]
  ) {
    updateClinic(
      input: {
        id: $id
        phone: $phone
        name: $name
        description: $description
        county: $county
        town: $town
        address: $address
        categories: $categories
        web: $web
      }
    ) {
      id
    }
  }
`
export type UpdateClinicMutationFn = Apollo.MutationFunction<
  UpdateClinicMutation,
  UpdateClinicMutationVariables
>

/**
 * __useUpdateClinicMutation__
 *
 * To run a mutation, you first call `useUpdateClinicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClinicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClinicMutation, { data, loading, error }] = useUpdateClinicMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      phone: // value for 'phone'
 *      county: // value for 'county'
 *      town: // value for 'town'
 *      address: // value for 'address'
 *      web: // value for 'web'
 *      description: // value for 'description'
 *      categories: // value for 'categories'
 *   },
 * });
 */
export function useUpdateClinicMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateClinicMutation, UpdateClinicMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateClinicMutation, UpdateClinicMutationVariables>(
    UpdateClinicDocument,
    options,
  )
}
export type UpdateClinicMutationHookResult = ReturnType<typeof useUpdateClinicMutation>
export type UpdateClinicMutationResult = Apollo.MutationResult<UpdateClinicMutation>
export type UpdateClinicMutationOptions = Apollo.BaseMutationOptions<
  UpdateClinicMutation,
  UpdateClinicMutationVariables
>
