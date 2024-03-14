import { gql } from "apollo-server-express"

export const createBooking = gql`
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

export const updateBooking = gql`
  mutation Mutation($id: ID!, $device: String!, $cost: Float!, $serviceId: ID!, $token: String!) {
    updateBooking(_id: $id, device: $device, cost: $cost, serviceId: $serviceId, token: $token) {
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

export const deleteBooking = gql`
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
