import { gql } from "@apollo/client"

export const GET_COMPANY = gql`
  query Company($id: ID!) {
    company(_id: $id) {
      address {
        houseNumber
        street
        zipCode
      }
      description
      name
      services {
        estimatedPrice
        estimatedTime
        imageUrl
        name
        _id
      }
      owner {
        lastName
        firstName
        _id
      }
      _id
    }
  }
`