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
      cases {
        id
        title
      }
      activities {
        id
        subject
      }
    }
  }
`
