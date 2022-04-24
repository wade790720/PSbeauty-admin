import { gql } from "@apollo/client"

export const getUserId = gql`
  query getUserId($account: String!, $vendor: Vendor!) {
    userList(account: $account, vendor: $vendor) {
      id
      account
      vendor
    }
  }
`
