import { gql } from "@apollo/client"

export const GetSetting = gql`
  query GetSetting（） {
    popularKeywords {
      keywords
    }
    query {
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
  }
`
