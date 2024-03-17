import { gql } from "@apollo/client"

export const CREATE_BOOKING = gql`
  mutation Mutation($startTime: String!, $endTime: String!, $status: Status!, $device: String!, $cost: Float!, $serviceId: ID!, $token: String!) {
    createBooking(startTime: $startTime, endTime: $endTime, status: $status, device: $device, cost: $cost, serviceId: $serviceId, token: $token) {
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

export const UPDATE_BOOKING = gql`
  mutation Mutation($id: ID!, $device: String!, $cost: Float!, $serviceId: ID!, $token: String!, $status: Status) {
    updateBooking(_id: $id, device: $device, cost: $cost, serviceId: $serviceId, token: $token, status: $status) {
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

export const DELETE_BOOKING = gql`
  mutation Mutation($id: ID!, $token: String!) {
    deleteBooking(_id: $id, token: $token) {
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
