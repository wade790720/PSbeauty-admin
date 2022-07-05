import { gql } from "@apollo/client"

export const GetClinic = gql`
  query GetClinic(
    $clinicFirst: Int
    $clinicOrderId: SortEnumType
    $adImagesFirst: Int
    $adImagesOrderId: SortEnumType
    $adImagesWhere: String
  ) {
    clinics(order: { id: $clinicOrderId }, first: $clinicFirst) {
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
    adImages(
      where: { usageType: { eq: $adImagesWhere } }
      order: { id: $adImagesOrderId }
      first: $adImagesFirst
    ) {
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
          image
          sort
          usageType
          redirectType
          targetId
          status
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
