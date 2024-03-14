import { gql } from "@apollo/client"

export const getBooking = gql`
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

export const getBookingsByUser = gql`
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

export const getAllBookings = gql`
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

