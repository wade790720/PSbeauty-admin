import { gql } from "@apollo/client"

export const GetClinic = gql`
  query GetClinic($id: String) {
    myClinic {
      id
      name
      paid
      latestPayAt
      paySets
      contactEmail
      contactName
      contactPhone
    }
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
    clinicImages(clinicId: $id) {
      id
      image
      sort
      title
      redirectType
      targetId
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
    doctorByClinicId(clinicId: $id) {
      id
      name
      resumes
      photo
      title
      expertise
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

export const AddDoctor = gql`
  mutation AddDoctor(
    $clinicId: String
    $name: String
    $expertise: String
    $photo: String
    $resumes: [String]
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
