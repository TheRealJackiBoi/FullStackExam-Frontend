import { IAddress } from "./addressTypes";
import { Service } from "./serviceTypes";
import { User } from "./usertypes";

export interface Company {
    _id?: string;
    name: string;
    address: IAddress;
    description: string;
    //admins?: ObjectId[];
    owner?: User;
    openForBooking: boolean;
    bustle?: Bustle;
    services?: Service[];
  }

  export enum Bustle {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
  }