import { gql } from "@apollo/client"

export const GetHome = gql`
  query GetHome(
    $adCardsFirst: Int
    $adCardsOrderId: SortEnumType
    $adImagesFirst: Int
    $adImagesOrderId: SortEnumType
    $adImagesWhere: String
  ) {
    adCards(first: $adCardsFirst, order: { id: $adCardsOrderId }) {
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
          title
          content
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
          title
        }
      }
    }
  }
`

export const AddAdCard = gql`
  mutation AddAdCard($image: String, $title: String, $content: String) {
    addAdCard(input: { image: $image, title: $title, content: $content }) {
      id
    }
  }
`

export const DeleteAdCard = gql`
  mutation DeleteAdCard($id: String) {
    deleteAdCard(input: { id: $id }) {
      id
    }
  }
`

export const AddAdImage = gql`
  mutation AddAdImage(
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

export const UpdateAdImage = gql`
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

export const DeleteAdImage = gql`
  mutation DeleteAdImage($id: String) {
    deleteAdImage(input: { id: $id }) {
      id
    }
  }
`
