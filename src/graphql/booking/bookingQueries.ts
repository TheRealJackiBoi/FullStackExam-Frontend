import { gql } from "@apollo/client"

export const GET_BOOKING_BY_ID = gql`
  query Query($id: ID!, $token: String!) {
    booking(_id: $id, token: $token) {
      _id
      startTime
      endTime
      status
      case {
        device
        cost
        service {
          _id
          name
          estimatedTime
        }
      }
    }
  }
`

export const GET_BOOKINGS_BY_USER = gql`
  query Query($id: ID!, $token: String!) {
    bookingsByUser(_id: $id, token: $token) {
      _id
      startTime
      endTime
      status
      case {
        device
        cost
        service {
          _id
          name
          estimatedTime
        }
      }
    }
  }
`

export const GET_ALL_BOOKINGS = gql`
  query Query($token: String!) {
    bookings(token: $token) {
      _id
      startTime
      endTime
      status
      case {
        device
        cost
        service {
          _id
          name
          estimatedTime
        }
      }
    }
  }
`

