import { Company } from "./companyTypes";
import { Service } from "./serviceTypes";
import { User } from "./usertypes";


export interface Booking {
  __id: string;
  startTime: Date;
  endTime: Date;
  status: Status;
  case: Case;
  company?: Company;
  user?: User;  
}

export interface Case {
  device: string;
  cost: number;
  service?: Service;
}

export enum Status {
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  ONHOLD = "ONHOLD",
}