import { gql } from "@apollo/client"

export const getHomeQuery = gql`
  query GetHomeQuery(
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
