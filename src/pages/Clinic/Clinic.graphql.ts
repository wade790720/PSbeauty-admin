import { gql } from "@apollo/client"

export const GetClinic = gql`
  query GetClinic($first: Int, $orderId: SortEnumType) {
    clinics(order: { id: $orderId }, first: $first) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          consultReplyCount
          caseCount
          county
          town
          address
          name
          id
        }
      }
    }
  }
`

export const AddClinic = gql`
  mutation AddClinic(
    $name: String
    $categories: [String]
    $county: String
    $town: String
    $address: String
    $description: String
    $phone: String
    $web: String
  ) {
    addClinic(
      input: {
        name: $name
        categories: $categories
        county: $county
        town: $town
        address: $address
        description: $description
        phone: $phone
        web: $web
      }
    ) {
      id
    }
  }
`

export const DeleteClinic = gql`
  mutation DeleteClinic($id: String) {
    deleteClinic(input: { id: $id }) {
      id
    }
  }
`
