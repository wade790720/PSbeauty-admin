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
      categories {
        id
        name
      }
    }
    caseByClinicId(clinicId: $id) {
      id
      title
      beforeImage
      afterImage
      description
      categories {
        id
        name
      }
    }
  }
`

export const UpdateClinic = gql`
  mutation UpdateClinic(
    $id: String
    $name: String
    $phone: String
    $county: String
    $town: String
    $address: String
    $web: String
    $description: String
    $categories: [String]
  ) {
    updateClinic(
      input: {
        id: $id
        phone: $phone
        name: $name
        description: $description
        county: $county
        town: $town
        address: $address
        categories: $categories
        web: $web
      }
    ) {
      id
    }
  }
`
