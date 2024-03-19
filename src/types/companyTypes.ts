import { User } from "./usertypes"
import { Address } from "./addressTypes"
import { Service } from "./serviceTypes"
import { CategoryEnum } from "./categoryEnum"

export interface Company {
  _id?: string
  name: string
  owner?: User
  services?: Service[]
  address: Address
  description: string
  //admins?: ObjectId[];
  openForBooking: boolean
  bustle?: Bustle
  categories: CategoryEnum[]
}

export enum Bustle {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}
