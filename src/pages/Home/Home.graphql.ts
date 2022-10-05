import { gql } from "@apollo/client"

export const GetHome = gql`
  query GetHome($first: Int, $orderId: SortEnumType) {
    adCards(first: $first, order: { id: $orderId }) {
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
  }
`

export const AddAdCard = gql`
  mutation AddAdCard($image: String, $title: String, $content: String) {
    addAdCard(input: { image: $image, title: $title, content: $content }) {
      id
    }
  }
`

export const UpdateAdCard = gql`
  mutation UpdateAdCard($id: String, $image: String, $title: String, $content: String) {
    updateAdCard(input: { id: $id, image: $image, title: $title, content: $content }) {
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
