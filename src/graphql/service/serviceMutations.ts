import { gql } from "@apollo/client"

export const CREATE_SERVICE = gql`
  mutation Mutation($name: String!, $estimatedTime: Int!, $estimatedPrice: Float!, $imageUrl: String!, $companyId: ID!, $token: String!) {
    createService(name: $name, estimatedTime: $estimatedTime, estimatedPrice: $estimatedPrice, imageUrl: $imageUrl, companyId: $companyId, token: $token) {
      _id
      estimatedPrice
      estimatedTime
      imageUrl
      name
    }
  }
`

export const DELETE_SERVICE = gql`
  mutation Mutation($id: ID!, $token: String!) {
    deleteService(_id: $id, token: $token) {
      _id
      name
    }
  }
`
