import { gql } from "@apollo/client"

export const createCompany = gql`
  mutation Mutation($name: String!, $description: String!, $zipCode: Int!, $street: String!, $houseNumber: Int!, $companyOwnerId: ID!, $token: String!) {
    createCompany(name: $name, description: $description, zipCode: $zipCode, street: $street, houseNumber: $houseNumber, companyOwnerId: $companyOwnerId, token: $token) {
      _id
      name
      address {
        _id
        zipCode
        street
        houseNumber
      }
      description
      openForBooking
      bustle
      owner {
        _id
        firstName
        lastName
      }
    }
  }
`

export const updateCompany = gql`
  mutation Mutation($id: ID!, $token: String!, $houseNumber: Int, $streetName: String, $zipCode: Int, $description: String, $name: String) {
    updateCompany(_id: $id, token: $token, houseNumber: $houseNumber, streetName: $streetName, zipCode: $zipCode, description: $description, name: $name) {
      _id
      name
      address {
        _id
        zipCode
        street
        houseNumber
      }
      description
      openForBooking
      bustle
    }
  }
`
