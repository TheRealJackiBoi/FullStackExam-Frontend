import { gql } from "@apollo/client"

export const LOGIN_USER = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      token
      user {
        firstName
        lastName
        role
        address {
          street
          houseNumber
          zipCode
        }
        company {
          _id
          name
        }
      }
    }
  }
`

export const CREATE_USER = gql`
  mutation Mutation($email: String!, $password: String!, $user: UserInput!) {
    createUser(email: $email, password: $password, user: $user) {
      firstName
      lastName
      role
    }
  }
`
