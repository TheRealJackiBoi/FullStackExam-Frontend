import { gql } from "@apollo/client"

export const GET_COMPANY_BY_ID = gql`
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
        company {
          _id
        }
      }
    }
  }
`

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

export const GET_COMPANIES = gql`
  query Query {
    companies {
      _id
      name
      services {
        _id
        name
        estimatedTime
      }
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
