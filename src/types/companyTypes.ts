import { User } from "./usertypes";
import { Address } from "./addressTypes";
import { Service } from "./serviceTypes";
import { Booking } from "./bookingTypes";

export interface Company {
    _id?: string;
    name: string;
    owner?: User;
    services?: Service[];
    address: Address;
    description: string;
    admins?: User[];
    openForBooking: boolean;
    bustle?: Bustle;
    bookings?: Booking[];
  }

  export enum Bustle {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
  }