import { gql } from "@apollo/client"

export const CREATE_COMPANY = gql`
  mutation Mutation($name: String!, $description: String!, $zipCode: Int!, $street: String!, $houseNumber: Int!, $companyOwnerId: ID!, $token: String!, $categories: [Category!]) {
    createCompany(name: $name, description: $description, zipCode: $zipCode, street: $street, houseNumber: $houseNumber, companyOwnerId: $companyOwnerId, token: $token, categories: $categories) {
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
      categories
    }
  }
`

export const UPDATE_COMPANY_BY_ID = gql`
  mutation Mutation($id: ID!, $token: String!, $houseNumber: Int, $streetName: String, $zipCode: Int, $description: String, $name: String, $categories: [Category!]) {
    updateCompany(_id: $id, token: $token, houseNumber: $houseNumber, streetName: $streetName, zipCode: $zipCode, description: $description, name: $name, categories: $categories) {
      _id
      name
      address {
        _id
        zipCode
        street
        houseNumber
      }
      categories
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
  mutation Mutation($firstName: String!, $lastName: String!, $email: String!, $password: String!, $role: Role!, $zipCode: Int!, $street: String!, $houseNumber: Int!, $companyId: ID!, $token: String!) {
    createCompanyAdmin(firstName: $firstName, lastName: $lastName, email: $email, password: $password, role: $role, zipCode: $zipCode, street: $street, houseNumber: $houseNumber, companyId: $companyId, token: $token) {
      _id
      address {
        street
        _id
        houseNumber
        zipCode
      }
      firstName
      lastName
      role
    }
  }
`
export const DELETE_COMPANY_ADMIN = gql`
  mutation deleteCompanyAdmin($userId: ID!, $companyId: ID!, $token: String!) {
    deleteCompanyAdmin(userId: $userId, companyId: $companyId, token: $token) {
      _id
      firstName
      lastName
    }
  }
`
