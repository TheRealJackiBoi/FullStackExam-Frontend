import { gql } from "@apollo/client"

export const GET_COMPANY_BY_ID = gql`
  query Query($id: ID!) {
    company(_id: $id) {
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
