import { gql } from "@apollo/client"

export const GetAdImages = gql`
  query GetAdImages($first: Int, $orderId: SortEnumType, $where: String) {
    adImages(where: { usageType: { eq: $where } }, order: { id: $orderId }, first: $first) {
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
