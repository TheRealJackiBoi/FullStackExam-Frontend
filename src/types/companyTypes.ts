import { IAddress } from "./addressTypes";
import { Service } from "./serviceTypes";

export interface ICompany {
    _id?: string;
    name: string;
    address: IAddress;
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