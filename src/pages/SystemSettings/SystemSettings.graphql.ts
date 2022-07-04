import { gql } from "@apollo/client"

export const GetSetting = gql`
  query GetSetting {
    popularKeywords {
      keywords
    }
    users {
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
          name
          email
        }
      }
    }
  }
`

export const DeleteMember = gql`
  mutation DeleteMember($id: String) {
    deleteUser(input: { id: $id }) {
      id
    }
  }
`
