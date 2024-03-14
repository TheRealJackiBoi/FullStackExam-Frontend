import { gql } from "@apollo/client"

export const LOGIN_USER = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      token
    }
  }
`

export const createUser = gql`
  mutation Mutation($email: String!, $password: String!, $user: UserInput!) {
    createUser(email: $email, password: $password, user: $user) {
      firstName
      lastName
      role
    }
  }
`
