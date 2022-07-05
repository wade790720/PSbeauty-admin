import { gql } from "@apollo/client"

export const GetAllClinics = gql`
  query GetAllClinics {
    allClinics {
      id
      name
    }
  }
`

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
