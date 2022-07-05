import * as Types from "../../types/schema"

import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
const defaultOptions = {} as const
export type CasesFragment = {
  __typename: "Clinic"
  cases: Array<{
    __typename: "ClinicCase"
    id: string | null
    title: string | null
    beforeImage: string | null
    afterImage: string | null
    description: string | null
    categories: Array<{
      __typename: "Category"
      id: string | null
      name: string | null
    } | null> | null
  } | null> | null
}

export type ImagesFragment = {
  __typename: "Clinic"
  images: Array<{
    __typename: "ClinicImage"
    id: string | null
    image: string | null
    sort: number
    title: string | null
    redirectType: string | null
    targetId: string | null
  } | null> | null
}

export type DoctorsFragment = {
  __typename: "Clinic"
  doctors: Array<{
    __typename: "ClinicDoctor"
    id: string | null
    name: string | null
    resumes: string | null
    photo: string | null
    title: string | null
    expertise: string | null
  } | null> | null
}

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
    paid: boolean
    latestPayAt: number
    paySets: number
    contactEmail: string | null
    contactName: string | null
    contactPhone: string | null
    consultReplyCount: number
    categories: Array<{
      __typename: "Category"
      id: string | null
      name: string | null
    } | null> | null
    cases: Array<{
      __typename: "ClinicCase"
      id: string | null
      title: string | null
      beforeImage: string | null
      afterImage: string | null
      description: string | null
      categories: Array<{
        __typename: "Category"
        id: string | null
        name: string | null
      } | null> | null
    } | null> | null
    doctors: Array<{
      __typename: "ClinicDoctor"
      id: string | null
      name: string | null
      resumes: string | null
      photo: string | null
      title: string | null
      expertise: string | null
    } | null> | null
    images: Array<{
      __typename: "ClinicImage"
      id: string | null
      image: string | null
      sort: number
      title: string | null
      redirectType: string | null
      targetId: string | null
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

export type AddDoctorMutationVariables = Types.Exact<{
  clinicId: Types.InputMaybe<Types.Scalars["String"]>
  name: Types.InputMaybe<Types.Scalars["String"]>
  expertise: Types.InputMaybe<Types.Scalars["String"]>
  photo: Types.InputMaybe<Types.Scalars["String"]>
  resumes: Types.InputMaybe<Types.Scalars["String"]>
  title: Types.InputMaybe<Types.Scalars["String"]>
}>

export type AddDoctorMutation = {
  addDoctor: { __typename: "AddDoctorPayload"; id: string | null } | null
}

export type DeleteDoctorMutationVariables = Types.Exact<{
  id: Types.InputMaybe<Types.Scalars["String"]>
}>

export type DeleteDoctorMutation = {
  deleteDoctor: { __typename: "DeleteDoctorPayload"; id: string | null } | null
}

export type AddClinicImageMutationVariables = Types.Exact<{
  clinicId: Types.InputMaybe<Types.Scalars["String"]>
  sort: Types.Scalars["Int"]
  status: Types.Scalars["Boolean"]
  title: Types.InputMaybe<Types.Scalars["String"]>
  image: Types.InputMaybe<Types.Scalars["String"]>
  redirectType: Types.InputMaybe<Types.Scalars["String"]>
  targetId: Types.InputMaybe<Types.Scalars["String"]>
}>

export type AddClinicImageMutation = {
  addClinicImage: { __typename: "AddClinicImagePayload"; id: string | null } | null
}

export type UpdateClinicImageMutationVariables = Types.Exact<{
  clinicId: Types.InputMaybe<Types.Scalars["String"]>
  sort: Types.Scalars["Int"]
  status: Types.Scalars["Boolean"]
  title: Types.InputMaybe<Types.Scalars["String"]>
  image: Types.InputMaybe<Types.Scalars["String"]>
  redirectType: Types.InputMaybe<Types.Scalars["String"]>
  targetId: Types.InputMaybe<Types.Scalars["String"]>
}>

export type UpdateClinicImageMutation = {
  updateClinicImage: { __typename: "UpdateClinicImagePayload"; id: string | null } | null
}

export type DeleteClinicImageMutationVariables = Types.Exact<{
  id: Types.InputMaybe<Types.Scalars["String"]>
}>

export type DeleteClinicImageMutation = {
  deleteClinicImage: { __typename: "DeleteClinicImagePayload"; id: string | null } | null
}

export type UpdateClinicContactMutationVariables = Types.Exact<{
  id: Types.InputMaybe<Types.Scalars["String"]>
  contactName: Types.InputMaybe<Types.Scalars["String"]>
  contactEmail: Types.InputMaybe<Types.Scalars["String"]>
  contactPhone: Types.InputMaybe<Types.Scalars["String"]>
}>

export type UpdateClinicContactMutation = {
  updateClinicContact: { __typename: "UpdateClinicContactPayload"; id: string | null } | null
}

export const CasesFragmentDoc = gql`
  fragment Cases on Clinic {
    cases {
      id
      title
      beforeImage
      afterImage
      description
      categories {
        id
        name
      }
    }
  }
`
export const ImagesFragmentDoc = gql`
  fragment Images on Clinic {
    images {
      id
      image
      sort
      title
      redirectType
      targetId
    }
  }
`
export const DoctorsFragmentDoc = gql`
  fragment Doctors on Clinic {
    doctors {
      id
      name
      resumes
      photo
      title
      expertise
    }
  }
`
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
      paid
      latestPayAt
      paySets
      contactEmail
      contactName
      contactPhone
      consultReplyCount
      categories {
        id
        name
      }
      ...Cases
      ...Doctors
      ...Images
    }
  }
  ${CasesFragmentDoc}
  ${DoctorsFragmentDoc}
  ${ImagesFragmentDoc}
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
export const AddDoctorDocument = gql`
  mutation AddDoctor(
    $clinicId: String
    $name: String
    $expertise: String
    $photo: String
    $resumes: String
    $title: String
  ) {
    addDoctor(
      input: {
        clinicId: $clinicId
        name: $name
        expertise: $expertise
        photo: $photo
        resumes: $resumes
        title: $title
      }
    ) {
      id
    }
  }
`
export type AddDoctorMutationFn = Apollo.MutationFunction<
  AddDoctorMutation,
  AddDoctorMutationVariables
>

/**
 * __useAddDoctorMutation__
 *
 * To run a mutation, you first call `useAddDoctorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDoctorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDoctorMutation, { data, loading, error }] = useAddDoctorMutation({
 *   variables: {
 *      clinicId: // value for 'clinicId'
 *      name: // value for 'name'
 *      expertise: // value for 'expertise'
 *      photo: // value for 'photo'
 *      resumes: // value for 'resumes'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useAddDoctorMutation(
  baseOptions?: Apollo.MutationHookOptions<AddDoctorMutation, AddDoctorMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddDoctorMutation, AddDoctorMutationVariables>(
    AddDoctorDocument,
    options,
  )
}
export type AddDoctorMutationHookResult = ReturnType<typeof useAddDoctorMutation>
export type AddDoctorMutationResult = Apollo.MutationResult<AddDoctorMutation>
export type AddDoctorMutationOptions = Apollo.BaseMutationOptions<
  AddDoctorMutation,
  AddDoctorMutationVariables
>
export const DeleteDoctorDocument = gql`
  mutation DeleteDoctor($id: String) {
    deleteDoctor(input: { id: $id }) {
      id
    }
  }
`
export type DeleteDoctorMutationFn = Apollo.MutationFunction<
  DeleteDoctorMutation,
  DeleteDoctorMutationVariables
>

/**
 * __useDeleteDoctorMutation__
 *
 * To run a mutation, you first call `useDeleteDoctorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDoctorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDoctorMutation, { data, loading, error }] = useDeleteDoctorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDoctorMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteDoctorMutation, DeleteDoctorMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteDoctorMutation, DeleteDoctorMutationVariables>(
    DeleteDoctorDocument,
    options,
  )
}
export type DeleteDoctorMutationHookResult = ReturnType<typeof useDeleteDoctorMutation>
export type DeleteDoctorMutationResult = Apollo.MutationResult<DeleteDoctorMutation>
export type DeleteDoctorMutationOptions = Apollo.BaseMutationOptions<
  DeleteDoctorMutation,
  DeleteDoctorMutationVariables
>
export const AddClinicImageDocument = gql`
  mutation AddClinicImage(
    $clinicId: String
    $sort: Int!
    $status: Boolean!
    $title: String
    $image: String
    $redirectType: String
    $targetId: String
  ) {
    addClinicImage(
      input: {
        clinicId: $clinicId
        sort: $sort
        status: $status
        title: $title
        image: $image
        redirectType: $redirectType
        targetId: $targetId
      }
    ) {
      id
    }
  }
`
export type AddClinicImageMutationFn = Apollo.MutationFunction<
  AddClinicImageMutation,
  AddClinicImageMutationVariables
>

/**
 * __useAddClinicImageMutation__
 *
 * To run a mutation, you first call `useAddClinicImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddClinicImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addClinicImageMutation, { data, loading, error }] = useAddClinicImageMutation({
 *   variables: {
 *      clinicId: // value for 'clinicId'
 *      sort: // value for 'sort'
 *      status: // value for 'status'
 *      title: // value for 'title'
 *      image: // value for 'image'
 *      redirectType: // value for 'redirectType'
 *      targetId: // value for 'targetId'
 *   },
 * });
 */
export function useAddClinicImageMutation(
  baseOptions?: Apollo.MutationHookOptions<AddClinicImageMutation, AddClinicImageMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddClinicImageMutation, AddClinicImageMutationVariables>(
    AddClinicImageDocument,
    options,
  )
}
export type AddClinicImageMutationHookResult = ReturnType<typeof useAddClinicImageMutation>
export type AddClinicImageMutationResult = Apollo.MutationResult<AddClinicImageMutation>
export type AddClinicImageMutationOptions = Apollo.BaseMutationOptions<
  AddClinicImageMutation,
  AddClinicImageMutationVariables
>
export const UpdateClinicImageDocument = gql`
  mutation UpdateClinicImage(
    $clinicId: String
    $sort: Int!
    $status: Boolean!
    $title: String
    $image: String
    $redirectType: String
    $targetId: String
  ) {
    updateClinicImage(
      input: {
        clinicId: $clinicId
        sort: $sort
        status: $status
        title: $title
        image: $image
        redirectType: $redirectType
        targetId: $targetId
      }
    ) {
      id
    }
  }
`
export type UpdateClinicImageMutationFn = Apollo.MutationFunction<
  UpdateClinicImageMutation,
  UpdateClinicImageMutationVariables
>

/**
 * __useUpdateClinicImageMutation__
 *
 * To run a mutation, you first call `useUpdateClinicImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClinicImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClinicImageMutation, { data, loading, error }] = useUpdateClinicImageMutation({
 *   variables: {
 *      clinicId: // value for 'clinicId'
 *      sort: // value for 'sort'
 *      status: // value for 'status'
 *      title: // value for 'title'
 *      image: // value for 'image'
 *      redirectType: // value for 'redirectType'
 *      targetId: // value for 'targetId'
 *   },
 * });
 */
export function useUpdateClinicImageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateClinicImageMutation,
    UpdateClinicImageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateClinicImageMutation, UpdateClinicImageMutationVariables>(
    UpdateClinicImageDocument,
    options,
  )
}
export type UpdateClinicImageMutationHookResult = ReturnType<typeof useUpdateClinicImageMutation>
export type UpdateClinicImageMutationResult = Apollo.MutationResult<UpdateClinicImageMutation>
export type UpdateClinicImageMutationOptions = Apollo.BaseMutationOptions<
  UpdateClinicImageMutation,
  UpdateClinicImageMutationVariables
>
export const DeleteClinicImageDocument = gql`
  mutation DeleteClinicImage($id: String) {
    deleteClinicImage(input: { id: $id }) {
      id
    }
  }
`
export type DeleteClinicImageMutationFn = Apollo.MutationFunction<
  DeleteClinicImageMutation,
  DeleteClinicImageMutationVariables
>

/**
 * __useDeleteClinicImageMutation__
 *
 * To run a mutation, you first call `useDeleteClinicImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClinicImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClinicImageMutation, { data, loading, error }] = useDeleteClinicImageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClinicImageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteClinicImageMutation,
    DeleteClinicImageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteClinicImageMutation, DeleteClinicImageMutationVariables>(
    DeleteClinicImageDocument,
    options,
  )
}
export type DeleteClinicImageMutationHookResult = ReturnType<typeof useDeleteClinicImageMutation>
export type DeleteClinicImageMutationResult = Apollo.MutationResult<DeleteClinicImageMutation>
export type DeleteClinicImageMutationOptions = Apollo.BaseMutationOptions<
  DeleteClinicImageMutation,
  DeleteClinicImageMutationVariables
>
export const UpdateClinicContactDocument = gql`
  mutation UpdateClinicContact(
    $id: String
    $contactName: String
    $contactEmail: String
    $contactPhone: String
  ) {
    updateClinicContact(
      input: {
        id: $id
        contactName: $contactName
        contactEmail: $contactEmail
        contactPhone: $contactPhone
      }
    ) {
      id
    }
  }
`
export type UpdateClinicContactMutationFn = Apollo.MutationFunction<
  UpdateClinicContactMutation,
  UpdateClinicContactMutationVariables
>

/**
 * __useUpdateClinicContactMutation__
 *
 * To run a mutation, you first call `useUpdateClinicContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClinicContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClinicContactMutation, { data, loading, error }] = useUpdateClinicContactMutation({
 *   variables: {
 *      id: // value for 'id'
 *      contactName: // value for 'contactName'
 *      contactEmail: // value for 'contactEmail'
 *      contactPhone: // value for 'contactPhone'
 *   },
 * });
 */
export function useUpdateClinicContactMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateClinicContactMutation,
    UpdateClinicContactMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateClinicContactMutation, UpdateClinicContactMutationVariables>(
    UpdateClinicContactDocument,
    options,
  )
}
export type UpdateClinicContactMutationHookResult = ReturnType<
  typeof useUpdateClinicContactMutation
>
export type UpdateClinicContactMutationResult = Apollo.MutationResult<UpdateClinicContactMutation>
export type UpdateClinicContactMutationOptions = Apollo.BaseMutationOptions<
  UpdateClinicContactMutation,
  UpdateClinicContactMutationVariables
>
