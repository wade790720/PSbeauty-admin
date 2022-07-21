import { gql } from "@apollo/client"

export const GetSetting = gql`
  query GetSetting {
    popularKeywords {
      keywords
    }
    users {
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

export const GetCategories = gql`
  query GetCategories {
    topCategories {
      id
      name
      secondCategories {
        id
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

export const AddTopCategory = gql`
  mutation AddTopCategory($name: String) {
    addTopCategory(input: { name: $name }) {
      id
    }
  }
`

export const AddSecondCategory = gql`
  mutation AddSecondCategory($name: String, $topCategoryId: String) {
    addSecondCategory(input: { name: $name, topCategoryId: $topCategoryId }) {
      id
    }
  }
`

export const AddCategory = gql`
  mutation AddCategory($name: String, $topCategoryId: String, $secondCategoryId: String) {
    addCategory(
      input: { name: $name, topCategoryId: $topCategoryId, secondCategoryId: $secondCategoryId }
    ) {
      id
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

export const DeleteTopCategory = gql`
  mutation DeleteTopCategory($id: String) {
    deleteTopCategory(input: { id: $id }) {
      id
    }
  }
`

export const DeleteSecondCategory = gql`
  mutation DeleteSecondCategory($id: String) {
    deleteSecondCategory(input: { id: $id }) {
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
