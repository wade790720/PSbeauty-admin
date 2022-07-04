import { gql } from "@apollo/client"

export const GetClinicById = gql`
  query GetClinicById($id: String) {
    clinic(id: $id) {
      doctors {
        id
        name
      }
      cases {
        id
        title
      }
    }
  }
`
