import { gql } from "@apollo/client"

export const Cases = gql`
  fragment Cases on Clinic {
    cases {
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

export const Images = gql`
  fragment Images on Clinic {
    images {
      id
      image
      sort
      title
      redirectType
      targetId
      status
      clinic {
        id
        name
      }
    }
  }
`

export const Doctors = gql`
  fragment Doctors on Clinic {
    doctors {
      id
      name
      resumes
      photo
      title
      expertise
    }
  }
`

export const GetClinicDetail = gql`
  query GetClinicDetail($id: String) {
    clinic(id: $id) {
      id
      name
      phone
      county
      town
      address
      web
      description
      paid
      latestPayAt
      paySets
      contactEmail
      contactName
      contactPhone
      consultReplyCount
      categories {
        id
        name
      }
      ...Cases
      ...Doctors
      ...Images
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
export const AddCase = gql`
  mutation AddCase(
    $clinicId: String
    $beforeImage: String
    $beforeImageText: String
    $afterImage: String
    $afterImageText: String
    $categories: [String]
    $description: String
    $hot: Boolean!
    $title: String
  ) {
    addCase(
      input: {
        clinicId: $clinicId
        beforeImage: $beforeImage
        beforeImageText: $beforeImageText
        afterImage: $afterImage
        afterImageText: $afterImageText
        categories: $categories
        description: $description
        hot: $hot
        title: $title
      }
    ) {
      id
    }
  }
`

export const UpdateCase = gql`
  mutation UpdateCase(
    $id: String
    $beforeImage: String
    $beforeImageText: String
    $afterImage: String
    $afterImageText: String
    $categories: [String]
    $description: String
    $hot: Boolean!
    $title: String
  ) {
    updateCase(
      input: {
        id: $id
        beforeImage: $beforeImage
        beforeImageText: $beforeImageText
        afterImage: $afterImage
        afterImageText: $afterImage
        categories: $categories
        description: $description
        hot: $hot
        title: $title
      }
    ) {
      id
    }
  }
`

export const DeleteCase = gql`
  mutation DeleteCase($id: String) {
    deleteCase(input: { id: $id }) {
      id
    }
  }
`

export const AddDoctor = gql`
  mutation AddDoctor(
    $clinicId: String
    $name: String
    $expertise: String
    $photo: String
    $resumes: String
    $title: String
  ) {
    addDoctor(
      input: {
        clinicId: $clinicId
        name: $name
        expertise: $expertise
        photo: $photo
        resumes: $resumes
        title: $title
      }
    ) {
      id
    }
  }
`

export const DeleteDoctor = gql`
  mutation DeleteDoctor($id: String) {
    deleteDoctor(input: { id: $id }) {
      id
    }
  }
`

export const AddClinicImage = gql`
  mutation AddClinicImage(
    $clinicId: String
    $sort: Int!
    $status: Boolean!
    $title: String
    $image: String
    $redirectType: String
    $targetId: String
  ) {
    addClinicImage(
      input: {
        clinicId: $clinicId
        sort: $sort
        status: $status
        title: $title
        image: $image
        redirectType: $redirectType
        targetId: $targetId
      }
    ) {
      id
    }
  }
`

export const UpdateClinicImage = gql`
  mutation UpdateClinicImage(
    $id: String
    $clinicId: String
    $sort: Int!
    $status: Boolean!
    $title: String
    $image: String
    $redirectType: String
    $targetId: String
  ) {
    updateClinicImage(
      input: {
        id: $id
        clinicId: $clinicId
        sort: $sort
        status: $status
        title: $title
        image: $image
        redirectType: $redirectType
        targetId: $targetId
      }
    ) {
      id
    }
  }
`

export const DeleteClinicImage = gql`
  mutation DeleteClinicImage($id: String) {
    deleteClinicImage(input: { id: $id }) {
      id
    }
  }
`

export const UpdateClinicContact = gql`
  mutation UpdateClinicContact(
    $id: String
    $contactName: String
    $contactEmail: String
    $contactPhone: String
  ) {
    updateClinicContact(
      input: {
        id: $id
        contactName: $contactName
        contactEmail: $contactEmail
        contactPhone: $contactPhone
      }
    ) {
      id
    }
  }
`
