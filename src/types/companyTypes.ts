import { Address } from "./addressTypes";
import { Service } from "./serviceTypes";

export interface Company {
    _id?: string;
    name: string;
    address: Address;
    services: Service[];
    description: string;
    //admins?: ObjectId[];
    //owner?: ObjectId;
    openForBooking: boolean;
    bustle?: Bustle;
  }

  export enum Bustle {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
  }