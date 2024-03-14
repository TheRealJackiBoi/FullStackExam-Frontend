import { gql } from "@apollo/client"

export const getCompanyByID = gql`
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

export const getCompanies = gql`
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
