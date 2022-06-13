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
