import { gql } from "@apollo/client"

export const GetCategories = gql`
  query GetCategories {
    topCategories {
      name
      secondCategories {
        name
        categories {
          id
          name
          uniqueNumber
        }
      }
    }
  }
`
