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
    status: boolean
    clinic: { __typename: "Clinic"; id: string | null; name: string | null } | null
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

export type ActivityFragment = {
  __typename: "Clinic"
  activities: Array<{
    __typename: "ClinicActivity"
    id: string | null
    subject: string | null
    content: string | null
    image: string | null
  } | null> | null
}

export type GetClinicDetailQueryVariables = Types.Exact<{
  id: Types.InputMaybe<Types.Scalars["String"]>
}>

export type GetClinicDetailQuery = {
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
      status: boolean
      clinic: { __typename: "Clinic"; id: string | null; name: string | null } | null
    } | null> | null
    activities: Array<{
      __typename: "ClinicActivity"
      id: string | null
      subject: string | null
      content: string | null
      image: string | null
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

export type AddCaseMutationVariables = Types.Exact<{
  clinicId: Types.InputMaybe<Types.Scalars["String"]>
  beforeImage: Types.InputMaybe<Types.Scalars["String"]>
  beforeImageText: Types.InputMaybe<Types.Scalars["String"]>
  afterImage: Types.InputMaybe<Types.Scalars["String"]>
  afterImageText: Types.InputMaybe<Types.Scalars["String"]>
  categories: Types.InputMaybe<
    Array<Types.InputMaybe<Types.Scalars["String"]>> | Types.InputMaybe<Types.Scalars["String"]>
  >
  description: Types.InputMaybe<Types.Scalars["String"]>
  hot: Types.Scalars["Boolean"]
  title: Types.InputMaybe<Types.Scalars["String"]>
}>

export type AddCaseMutation = {
  addCase: { __typename: "AddCasePayload"; id: string | null } | null
}

export type UpdateCaseMutationVariables = Types.Exact<{
  id: Types.InputMaybe<Types.Scalars["String"]>
  beforeImage: Types.InputMaybe<Types.Scalars["String"]>
  beforeImageText: Types.InputMaybe<Types.Scalars["String"]>
  afterImage: Types.InputMaybe<Types.Scalars["String"]>
  afterImageText: Types.InputMaybe<Types.Scalars["String"]>
  categories: Types.InputMaybe<
    Array<Types.InputMaybe<Types.Scalars["String"]>> | Types.InputMaybe<Types.Scalars["String"]>
  >
  description: Types.InputMaybe<Types.Scalars["String"]>
  hot: Types.Scalars["Boolean"]
  title: Types.InputMaybe<Types.Scalars["String"]>
}>

export type UpdateCaseMutation = {
  updateCase: { __typename: "UpdateCasePayload"; id: string | null } | null
}

export type DeleteCaseMutationVariables = Types.Exact<{
  id: Types.InputMaybe<Types.Scalars["String"]>
}>

export type DeleteCaseMutation = {
  deleteCase: { __typename: "DeleteCasePayload"; id: string | null } | null
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
  id: Types.InputMaybe<Types.Scalars["String"]>
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

export type AddActivityMutationVariables = Types.Exact<{
  clinicId: Types.InputMaybe<Types.Scalars["String"]>
  image: Types.InputMaybe<Types.Scalars["String"]>
  subject: Types.InputMaybe<Types.Scalars["String"]>
  content: Types.InputMaybe<Types.Scalars["String"]>
}>

export type AddActivityMutation = {
  addActivity: { __typename: "AddActivityPayload"; id: string | null } | null
}

export type DeleteActivityMutationVariables = Types.Exact<{
  id: Types.InputMaybe<Types.Scalars["String"]>
}>

export type DeleteActivityMutation = {
  deleteActivity: { __typename: "DeleteActivityPayload"; id: string | null } | null
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
      status
      clinic {
        id
        name
      }
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
export const ActivityFragmentDoc = gql`
  fragment Activity on Clinic {
    activities {
      id
      subject
      content
      image
    }
  }
`
export const GetClinicDetailDocument = gql`
  query GetClinicDetail($id: String) {
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
      ...Activity
    }
  }
  ${CasesFragmentDoc}
  ${DoctorsFragmentDoc}
  ${ImagesFragmentDoc}
  ${ActivityFragmentDoc}
`

/**
 * __useGetClinicDetailQuery__
 *
 * To run a query within a React component, call `useGetClinicDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClinicDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClinicDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetClinicDetailQuery(
  baseOptions?: Apollo.QueryHookOptions<GetClinicDetailQuery, GetClinicDetailQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetClinicDetailQuery, GetClinicDetailQueryVariables>(
    GetClinicDetailDocument,
    options,
  )
}
export function useGetClinicDetailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetClinicDetailQuery, GetClinicDetailQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetClinicDetailQuery, GetClinicDetailQueryVariables>(
    GetClinicDetailDocument,
    options,
  )
}
export type GetClinicDetailQueryHookResult = ReturnType<typeof useGetClinicDetailQuery>
export type GetClinicDetailLazyQueryHookResult = ReturnType<typeof useGetClinicDetailLazyQuery>
export type GetClinicDetailQueryResult = Apollo.QueryResult<
  GetClinicDetailQuery,
  GetClinicDetailQueryVariables
>
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
export const AddCaseDocument = gql`
  mutation AddCase(
    $clinicId: String
    $beforeImage: String
    $beforeImageText: String
    $afterImage: String
    $afterImageText: String
    $categories: [String]
    $description: String
    $hot: Boolean!
    $title: String
  ) {
    addCase(
      input: {
        clinicId: $clinicId
        beforeImage: $beforeImage
        beforeImageText: $beforeImageText
        afterImage: $afterImage
        afterImageText: $afterImageText
        categories: $categories
        description: $description
        hot: $hot
        title: $title
      }
    ) {
      id
    }
  }
`
export type AddCaseMutationFn = Apollo.MutationFunction<AddCaseMutation, AddCaseMutationVariables>

/**
 * __useAddCaseMutation__
 *
 * To run a mutation, you first call `useAddCaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCaseMutation, { data, loading, error }] = useAddCaseMutation({
 *   variables: {
 *      clinicId: // value for 'clinicId'
 *      beforeImage: // value for 'beforeImage'
 *      beforeImageText: // value for 'beforeImageText'
 *      afterImage: // value for 'afterImage'
 *      afterImageText: // value for 'afterImageText'
 *      categories: // value for 'categories'
 *      description: // value for 'description'
 *      hot: // value for 'hot'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useAddCaseMutation(
  baseOptions?: Apollo.MutationHookOptions<AddCaseMutation, AddCaseMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddCaseMutation, AddCaseMutationVariables>(AddCaseDocument, options)
}
export type AddCaseMutationHookResult = ReturnType<typeof useAddCaseMutation>
export type AddCaseMutationResult = Apollo.MutationResult<AddCaseMutation>
export type AddCaseMutationOptions = Apollo.BaseMutationOptions<
  AddCaseMutation,
  AddCaseMutationVariables
>
export const UpdateCaseDocument = gql`
  mutation UpdateCase(
    $id: String
    $beforeImage: String
    $beforeImageText: String
    $afterImage: String
    $afterImageText: String
    $categories: [String]
    $description: String
    $hot: Boolean!
    $title: String
  ) {
    updateCase(
      input: {
        id: $id
        beforeImage: $beforeImage
        beforeImageText: $beforeImageText
        afterImage: $afterImage
        afterImageText: $afterImage
        categories: $categories
        description: $description
        hot: $hot
        title: $title
      }
    ) {
      id
    }
  }
`
export type UpdateCaseMutationFn = Apollo.MutationFunction<
  UpdateCaseMutation,
  UpdateCaseMutationVariables
>

/**
 * __useUpdateCaseMutation__
 *
 * To run a mutation, you first call `useUpdateCaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCaseMutation, { data, loading, error }] = useUpdateCaseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      beforeImage: // value for 'beforeImage'
 *      beforeImageText: // value for 'beforeImageText'
 *      afterImage: // value for 'afterImage'
 *      afterImageText: // value for 'afterImageText'
 *      categories: // value for 'categories'
 *      description: // value for 'description'
 *      hot: // value for 'hot'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUpdateCaseMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateCaseMutation, UpdateCaseMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateCaseMutation, UpdateCaseMutationVariables>(
    UpdateCaseDocument,
    options,
  )
}
export type UpdateCaseMutationHookResult = ReturnType<typeof useUpdateCaseMutation>
export type UpdateCaseMutationResult = Apollo.MutationResult<UpdateCaseMutation>
export type UpdateCaseMutationOptions = Apollo.BaseMutationOptions<
  UpdateCaseMutation,
  UpdateCaseMutationVariables
>
export const DeleteCaseDocument = gql`
  mutation DeleteCase($id: String) {
    deleteCase(input: { id: $id }) {
      id
    }
  }
`
export type DeleteCaseMutationFn = Apollo.MutationFunction<
  DeleteCaseMutation,
  DeleteCaseMutationVariables
>

/**
 * __useDeleteCaseMutation__
 *
 * To run a mutation, you first call `useDeleteCaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCaseMutation, { data, loading, error }] = useDeleteCaseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCaseMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteCaseMutation, DeleteCaseMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteCaseMutation, DeleteCaseMutationVariables>(
    DeleteCaseDocument,
    options,
  )
}
export type DeleteCaseMutationHookResult = ReturnType<typeof useDeleteCaseMutation>
export type DeleteCaseMutationResult = Apollo.MutationResult<DeleteCaseMutation>
export type DeleteCaseMutationOptions = Apollo.BaseMutationOptions<
  DeleteCaseMutation,
  DeleteCaseMutationVariables
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
    $id: String
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
        id: $id
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
 *      id: // value for 'id'
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
export const AddActivityDocument = gql`
  mutation AddActivity($clinicId: String, $image: String, $subject: String, $content: String) {
    addActivity(
      input: { clinicId: $clinicId, image: $image, subject: $subject, content: $content }
    ) {
      id
    }
  }
`
export type AddActivityMutationFn = Apollo.MutationFunction<
  AddActivityMutation,
  AddActivityMutationVariables
>

/**
 * __useAddActivityMutation__
 *
 * To run a mutation, you first call `useAddActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addActivityMutation, { data, loading, error }] = useAddActivityMutation({
 *   variables: {
 *      clinicId: // value for 'clinicId'
 *      image: // value for 'image'
 *      subject: // value for 'subject'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useAddActivityMutation(
  baseOptions?: Apollo.MutationHookOptions<AddActivityMutation, AddActivityMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddActivityMutation, AddActivityMutationVariables>(
    AddActivityDocument,
    options,
  )
}
export type AddActivityMutationHookResult = ReturnType<typeof useAddActivityMutation>
export type AddActivityMutationResult = Apollo.MutationResult<AddActivityMutation>
export type AddActivityMutationOptions = Apollo.BaseMutationOptions<
  AddActivityMutation,
  AddActivityMutationVariables
>
export const DeleteActivityDocument = gql`
  mutation DeleteActivity($id: String) {
    deleteActivity(input: { id: $id }) {
      id
    }
  }
`
export type DeleteActivityMutationFn = Apollo.MutationFunction<
  DeleteActivityMutation,
  DeleteActivityMutationVariables
>

/**
 * __useDeleteActivityMutation__
 *
 * To run a mutation, you first call `useDeleteActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteActivityMutation, { data, loading, error }] = useDeleteActivityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteActivityMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteActivityMutation, DeleteActivityMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteActivityMutation, DeleteActivityMutationVariables>(
    DeleteActivityDocument,
    options,
  )
}
export type DeleteActivityMutationHookResult = ReturnType<typeof useDeleteActivityMutation>
export type DeleteActivityMutationResult = Apollo.MutationResult<DeleteActivityMutation>
export type DeleteActivityMutationOptions = Apollo.BaseMutationOptions<
  DeleteActivityMutation,
  DeleteActivityMutationVariables
>
