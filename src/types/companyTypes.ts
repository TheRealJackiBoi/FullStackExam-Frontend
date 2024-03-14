export interface ICompany {
    _id?: string;
    name: string;
    address: IAddress;
    services: IService[];
    description: string;
    admins?: ObjectId[];
    owner?: ObjectId;
    openForBooking: boolean;
    bustle?: Bustle;
  }

  export enum Bustle {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
  }