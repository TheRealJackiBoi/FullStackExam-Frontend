import { User } from "./usertypes";
import { Address } from "./addressTypes";
import { Service } from "./serviceTypes";

export interface Company {
    _id?: string;
    name: string;
    owner?: User;
    services?: Service[];
    address: Address;
    description: string;
    //admins?: ObjectId[];
    openForBooking: boolean;
    bustle?: Bustle;
  }

  export enum Bustle {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
  }