import * as Types from "../../types/schema"

import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
const defaultOptions = {} as const
export type GetClinicQueryVariables = Types.Exact<{
  clinicFirst: Types.InputMaybe<Types.Scalars["Int"]>
  clinicOrderId: Types.InputMaybe<Types.SortEnumType>
  adImagesFirst: Types.InputMaybe<Types.Scalars["Int"]>
  adImagesOrderId: Types.InputMaybe<Types.SortEnumType>
  adImagesWhere: Types.InputMaybe<Types.Scalars["String"]>
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
        status: boolean
      } | null
    }> | null
  } | null
}

export type GetAllClinicsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetAllClinicsQuery = {
  allClinics: Array<{ __typename: "Clinic"; id: string | null; name: string | null } | null> | null
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

export type GetCategoriesQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetCategoriesQuery = {
  topCategories: Array<{
    __typename: "TopCategory"
    name: string | null
    secondCategories: Array<{
      __typename: "MiddleCategory"
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

export const GetClinicDocument = gql`
  query GetClinic(
    $clinicFirst: Int
    $clinicOrderId: SortEnumType
    $adImagesFirst: Int
    $adImagesOrderId: SortEnumType
    $adImagesWhere: String
  ) {
    clinics(order: { id: $clinicOrderId }, first: $clinicFirst) {
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
          status
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
 *      clinicFirst: // value for 'clinicFirst'
 *      clinicOrderId: // value for 'clinicOrderId'
 *      adImagesFirst: // value for 'adImagesFirst'
 *      adImagesOrderId: // value for 'adImagesOrderId'
 *      adImagesWhere: // value for 'adImagesWhere'
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
export const GetAllClinicsDocument = gql`
  query GetAllClinics {
    allClinics {
      id
      name
    }
  }
`

/**
 * __useGetAllClinicsQuery__
 *
 * To run a query within a React component, call `useGetAllClinicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllClinicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllClinicsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllClinicsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAllClinicsQuery, GetAllClinicsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAllClinicsQuery, GetAllClinicsQueryVariables>(
    GetAllClinicsDocument,
    options,
  )
}
export function useGetAllClinicsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAllClinicsQuery, GetAllClinicsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAllClinicsQuery, GetAllClinicsQueryVariables>(
    GetAllClinicsDocument,
    options,
  )
}
export type GetAllClinicsQueryHookResult = ReturnType<typeof useGetAllClinicsQuery>
export type GetAllClinicsLazyQueryHookResult = ReturnType<typeof useGetAllClinicsLazyQuery>
export type GetAllClinicsQueryResult = Apollo.QueryResult<
  GetAllClinicsQuery,
  GetAllClinicsQueryVariables
>
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
