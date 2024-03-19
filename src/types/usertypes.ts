import { Booking } from "./bookingTypes"
import { Company } from "./companyTypes"

// Define your types
export type User = {
  _id: string
  firstName: string
  lastName: string
  role: string
  address: Address
  company?: Company 
  bookings?: Booking[]
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
