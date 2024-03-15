// Define your types
export type User = {
  firstName: string
  lastName: string
  role: string
  address: Address
}

export type Address = {
  street: string
  houseNumber: number
  zipCode: number
}

export type LoginData = {
  email: string
  token: string
  user: User
}

export type LoginResponse = {
  error?: Error
  login?: LoginData
}
