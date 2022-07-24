import { gql } from "@apollo/client"

export const AddAdImage = gql`
  mutation AddAdImage(
    $title: String
    $usageType: String
    $redirect: String
    $sort: Int!
    $clinicId: String
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
        clinicId: $clinicId
        targetId: $targetId
        image: $image
        status: $status
      }
    ) {
      id
    }
  }
`

export const UpdateAdImage = gql`
  mutation UpdateAdImage(
    $id: String
    $title: String
    $sort: Int!
    $usageType: String
    $redirect: String
    $clinicId: String
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
        clinicId: $clinicId
        targetId: $targetId
        status: $status
      }
    ) {
      id
    }
  }
`

export const DeleteAdImage = gql`
  mutation DeleteAdImage($id: String) {
    deleteAdImage(input: { id: $id }) {
      id
    }
  }
`
