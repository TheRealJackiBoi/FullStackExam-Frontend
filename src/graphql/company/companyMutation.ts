import { gql } from "@apollo/client"

export const CREATE_COMPANY = gql`
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

export const UPDATE_COMPANY_BY_ID = gql`
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

export const DELETE_COMPANY_BY_ID = gql`
  mutation Mutation($id: ID!, $token: String!) {
    deleteCompany(_id: $id, token: $token) {
      _id
      name
    }
  }
`

export const REMOVE_COMPANY_ADMIN = gql`
  mutation Mutation($userId: ID!, $companyId: ID!, $token: String!) {
    deleteCompanyAdmin(userId: $userId, companyId: $companyId, token: $token) {
      _id
      name
      admins {
        firstName
        _id
        lastName
      }
      owner {
        _id
        firstName
        lastName
      }
    }
  }
`

export const CREATE_COMPANY_ADMIN = gql`
  query Query($id: ID!) {
    company(_id: $id) {
      _id
      name
      description
      openForBooking
      bustle
      services {
        estimatedPrice
        estimatedTime
        imageUrl
        name
        _id
      }
      address {
        _id
        zipCode
        street
        houseNumber
      }
      admins {
        _id
        firstName
        lastName
        role
      }
    }
  }
`
