import * as Types from "../../types/schema"

import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
const defaultOptions = {} as const
export type AddAdImageMutationVariables = Types.Exact<{
  title: Types.InputMaybe<Types.Scalars["String"]>
  usageType: Types.InputMaybe<Types.Scalars["String"]>
  redirect: Types.InputMaybe<Types.Scalars["String"]>
  sort: Types.Scalars["Int"]
  targetId: Types.InputMaybe<Types.Scalars["String"]>
  image: Types.InputMaybe<Types.Scalars["String"]>
  status: Types.Scalars["Boolean"]
}>

export type AddAdImageMutation = {
  addAdImage: { __typename: "AddAdImagePayload"; id: string | null } | null
}

export type UpdateAdImageMutationVariables = Types.Exact<{
  id: Types.InputMaybe<Types.Scalars["String"]>
  title: Types.InputMaybe<Types.Scalars["String"]>
  sort: Types.Scalars["Int"]
  usageType: Types.InputMaybe<Types.Scalars["String"]>
  redirect: Types.InputMaybe<Types.Scalars["String"]>
  targetId: Types.InputMaybe<Types.Scalars["String"]>
  status: Types.Scalars["Boolean"]
}>

export type UpdateAdImageMutation = {
  updateAdImage: { __typename: "UpdateAdImagePayload"; id: string | null } | null
}

export type DeleteAdImageMutationVariables = Types.Exact<{
  id: Types.InputMaybe<Types.Scalars["String"]>
}>

export type DeleteAdImageMutation = {
  deleteAdImage: { __typename: "DeleteAdImagePayload"; id: string | null } | null
}

export const AddAdImageDocument = gql`
  mutation AddAdImage(
    $title: String
    $usageType: String
    $redirect: String
    $sort: Int!
    $targetId: String
    $image: String
    $status: Boolean!
  ) {
    addAdImage(
      input: {
        usageType: $usageType
        title: $title
        redirectType: $redirect
        sort: $sort
        targetId: $targetId
        image: $image
        status: $status
      }
    ) {
      id
    }
  }
`
export type AddAdImageMutationFn = Apollo.MutationFunction<
  AddAdImageMutation,
  AddAdImageMutationVariables
>

/**
 * __useAddAdImageMutation__
 *
 * To run a mutation, you first call `useAddAdImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAdImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAdImageMutation, { data, loading, error }] = useAddAdImageMutation({
 *   variables: {
 *      title: // value for 'title'
 *      usageType: // value for 'usageType'
 *      redirect: // value for 'redirect'
 *      sort: // value for 'sort'
 *      targetId: // value for 'targetId'
 *      image: // value for 'image'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useAddAdImageMutation(
  baseOptions?: Apollo.MutationHookOptions<AddAdImageMutation, AddAdImageMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddAdImageMutation, AddAdImageMutationVariables>(
    AddAdImageDocument,
    options,
  )
}
export type AddAdImageMutationHookResult = ReturnType<typeof useAddAdImageMutation>
export type AddAdImageMutationResult = Apollo.MutationResult<AddAdImageMutation>
export type AddAdImageMutationOptions = Apollo.BaseMutationOptions<
  AddAdImageMutation,
  AddAdImageMutationVariables
>
export const UpdateAdImageDocument = gql`
  mutation UpdateAdImage(
    $id: String
    $title: String
    $sort: Int!
    $usageType: String
    $redirect: String
    $targetId: String
    $status: Boolean!
  ) {
    updateAdImage(
      input: {
        id: $id
        title: $title
        sort: $sort
        usageType: $usageType
        redirectType: $redirect
        targetId: $targetId
        status: $status
      }
    ) {
      id
    }
  }
`
export type UpdateAdImageMutationFn = Apollo.MutationFunction<
  UpdateAdImageMutation,
  UpdateAdImageMutationVariables
>

/**
 * __useUpdateAdImageMutation__
 *
 * To run a mutation, you first call `useUpdateAdImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAdImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAdImageMutation, { data, loading, error }] = useUpdateAdImageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      sort: // value for 'sort'
 *      usageType: // value for 'usageType'
 *      redirect: // value for 'redirect'
 *      targetId: // value for 'targetId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateAdImageMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateAdImageMutation, UpdateAdImageMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateAdImageMutation, UpdateAdImageMutationVariables>(
    UpdateAdImageDocument,
    options,
  )
}
export type UpdateAdImageMutationHookResult = ReturnType<typeof useUpdateAdImageMutation>
export type UpdateAdImageMutationResult = Apollo.MutationResult<UpdateAdImageMutation>
export type UpdateAdImageMutationOptions = Apollo.BaseMutationOptions<
  UpdateAdImageMutation,
  UpdateAdImageMutationVariables
>
export const DeleteAdImageDocument = gql`
  mutation DeleteAdImage($id: String) {
    deleteAdImage(input: { id: $id }) {
      id
    }
  }
`
export type DeleteAdImageMutationFn = Apollo.MutationFunction<
  DeleteAdImageMutation,
  DeleteAdImageMutationVariables
>

/**
 * __useDeleteAdImageMutation__
 *
 * To run a mutation, you first call `useDeleteAdImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAdImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAdImageMutation, { data, loading, error }] = useDeleteAdImageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAdImageMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteAdImageMutation, DeleteAdImageMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteAdImageMutation, DeleteAdImageMutationVariables>(
    DeleteAdImageDocument,
    options,
  )
}
export type DeleteAdImageMutationHookResult = ReturnType<typeof useDeleteAdImageMutation>
export type DeleteAdImageMutationResult = Apollo.MutationResult<DeleteAdImageMutation>
export type DeleteAdImageMutationOptions = Apollo.BaseMutationOptions<
  DeleteAdImageMutation,
  DeleteAdImageMutationVariables
>
