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
    topCategories {
      name
      secondCategories {
        name
        categories {
          id
          name
        }
      }
    }
  }
`

export const AddKeyword = gql`
  mutation AddKeyword($keyword: String) {
    addPopularKeyword(input: { keyword: $keyword }) {
      keyword
    }
  }
`

export const DeleteKeyword = gql`
  mutation DeleteKeyword($keyword: String) {
    deletePopularKeyword(input: { keyword: $keyword }) {
      keyword
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

export const AddCategory = gql`
  mutation AddCategory($topParent: String, $parent: String, $name: String) {
    addCategory(input: { topParent: $topParent, parent: $parent, name: $name }) {
      id
    }
  }
`

export const DeleteCategory = gql`
  mutation DeleteCategory($id: String) {
    deleteCategory(input: { id: $id }) {
      id
    }
  }
`
