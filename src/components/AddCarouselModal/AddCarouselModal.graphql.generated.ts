import * as Types from "../../types/schema"

import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
const defaultOptions = {} as const
export type GetClinicByIdQueryVariables = Types.Exact<{
  id: Types.InputMaybe<Types.Scalars["String"]>
}>

export type GetClinicByIdQuery = {
  clinic: {
    __typename: "Clinic"
    doctors: Array<{
      __typename: "ClinicDoctor"
      id: string | null
      name: string | null
    } | null> | null
    cases: Array<{
      __typename: "ClinicCase"
      id: string | null
      title: string | null
    } | null> | null
  } | null
}

export const GetClinicByIdDocument = gql`
  query GetClinicById($id: String) {
    clinic(id: $id) {
      doctors {
        id
        name
      }
      cases {
        id
        title
      }
    }
  }
`

/**
 * __useGetClinicByIdQuery__
 *
 * To run a query within a React component, call `useGetClinicByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClinicByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClinicByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetClinicByIdQuery(
  baseOptions?: Apollo.QueryHookOptions<GetClinicByIdQuery, GetClinicByIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetClinicByIdQuery, GetClinicByIdQueryVariables>(
    GetClinicByIdDocument,
    options,
  )
}
export function useGetClinicByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetClinicByIdQuery, GetClinicByIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetClinicByIdQuery, GetClinicByIdQueryVariables>(
    GetClinicByIdDocument,
    options,
  )
}
export type GetClinicByIdQueryHookResult = ReturnType<typeof useGetClinicByIdQuery>
export type GetClinicByIdLazyQueryHookResult = ReturnType<typeof useGetClinicByIdLazyQuery>
export type GetClinicByIdQueryResult = Apollo.QueryResult<
  GetClinicByIdQuery,
  GetClinicByIdQueryVariables
>
