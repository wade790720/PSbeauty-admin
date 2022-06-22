import { gql } from "@apollo/client"

export const GetClinic = gql`
  query GetClinic($id: String) {
    clinic(id: $id) {
      id
      name
      phone
      county
      town
      address
      web
      description
    }
  }
`
