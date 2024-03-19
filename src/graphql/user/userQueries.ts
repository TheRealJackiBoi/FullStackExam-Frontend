import { gql } from "@apollo/client"

export const GET_USER = gql`
  query User($id: ID!, $token: String!) {
    user(_id: $id, token: $token) {
      _id
      address {
        _id
        houseNumber
        street
        zipCode
      }
      company {
        _id
        name
        description
        address {
          houseNumber
          street
          zipCode
          _id
        }
        openForBooking
      }
      firstName
      lastName
      role
    }
  }
`
